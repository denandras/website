import { GetObjectCommand, ListObjectsV2Command, S3Client } from "@aws-sdk/client-s3";
import CvPageClient from "@/components/cv-page-client";
import { getS4Config, getS4CvPrefix, getS4UpcomingPrefix } from "@/lib/s4-config";

export const dynamic = "force-dynamic";

function isPdfKey(key: string) {
  return key.toLowerCase().endsWith(".pdf");
}

function isMarkdownKey(key: string) {
  const lowered = key.toLowerCase();
  return lowered.endsWith(".md") || lowered.endsWith(".markdown");
}

function fileNameFromKey(key: string) {
  const parts = key.split("/");
  return parts[parts.length - 1] || "cv.pdf";
}

function ensureTrailingSlash(prefix: string) {
  return prefix.endsWith("/") ? prefix : `${prefix}/`;
}

type UpcomingConcert = {
  date: string;
  city: string;
  venue: string;
  note?: string;
};

function parseUpcomingConcertsMarkdown(raw: string): UpcomingConcert[] {
  return raw
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.startsWith("- "))
    .map((line) => line.slice(2).trim())
    .filter(Boolean)
    .map((line) => line.split("|").map((part) => part.trim()))
    .filter((parts) => parts.length >= 3)
    .map((parts) => ({
      date: parts[0],
      city: parts[1],
      venue: parts[2],
      note: parts[3] || undefined,
    }));
}

function createS4Client() {
  const cfg = getS4Config();
  if (!cfg) return null;

  const client = new S3Client({
    endpoint: cfg.endpoint,
    region: cfg.region,
    forcePathStyle: true,
    credentials: {
      accessKeyId: cfg.accessKeyId,
      secretAccessKey: cfg.secretAccessKey,
    },
  });

  return { cfg, client };
}

async function getCvDownloadUrl(): Promise<string | null> {
  const s4 = createS4Client();
  const cvPrefixRaw = getS4CvPrefix();
  if (!s4 || !cvPrefixRaw) return null;

  const prefix = ensureTrailingSlash(cvPrefixRaw);

  try {
    let token: string | undefined;

    do {
      const list = await s4.client.send(
        new ListObjectsV2Command({
          Bucket: s4.cfg.bucket,
          Prefix: prefix,
          ContinuationToken: token,
          MaxKeys: 500,
        }),
      );

      const firstPdf = (list.Contents ?? []).find((obj) => obj.Key && isPdfKey(obj.Key));
      if (firstPdf?.Key) {
        const encodedKey = encodeURIComponent(firstPdf.Key);
        const encodedName = encodeURIComponent(fileNameFromKey(firstPdf.Key));
        return `/api/media/file?key=${encodedKey}&download=1&name=${encodedName}`;
      }

      token = list.IsTruncated ? list.NextContinuationToken : undefined;
    } while (token);

    return null;
  } catch {
    return null;
  }
}

async function getUpcomingConcerts(): Promise<UpcomingConcert[]> {
  const s4 = createS4Client();
  const upcomingPrefixRaw = getS4UpcomingPrefix();
  if (!s4 || !upcomingPrefixRaw) return [];

  const prefix = ensureTrailingSlash(upcomingPrefixRaw);

  try {
    let token: string | undefined;
    let markdownKey: string | null = null;

    do {
      const list = await s4.client.send(
        new ListObjectsV2Command({
          Bucket: s4.cfg.bucket,
          Prefix: prefix,
          ContinuationToken: token,
          MaxKeys: 500,
        }),
      );

      markdownKey = (list.Contents ?? []).find((obj) => obj.Key && isMarkdownKey(obj.Key))?.Key ?? null;
      if (markdownKey) break;

      token = list.IsTruncated ? list.NextContinuationToken : undefined;
    } while (token);

    if (!markdownKey) return [];

    const objectOutput = await s4.client.send(
      new GetObjectCommand({
        Bucket: s4.cfg.bucket,
        Key: markdownKey,
      }),
    );

    if (!objectOutput.Body) return [];

    const markdown = await objectOutput.Body.transformToString();
    return parseUpcomingConcertsMarkdown(markdown);
  } catch {
    return [];
  }
}

export default async function CvPage() {
  const [cvDownloadUrl, upcomingConcerts] = await Promise.all([
    getCvDownloadUrl(),
    getUpcomingConcerts(),
  ]);

  return <CvPageClient cvDownloadUrl={cvDownloadUrl} upcomingConcerts={upcomingConcerts} />;
}
