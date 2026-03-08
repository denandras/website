import { ListObjectsV2Command, S3Client } from "@aws-sdk/client-s3";
import CvPageClient from "@/components/cv-page-client";
import { getS4Config, getS4CvPrefix } from "@/lib/s4-config";

export const dynamic = "force-dynamic";

function isPdfKey(key: string) {
  return key.toLowerCase().endsWith(".pdf");
}

function fileNameFromKey(key: string) {
  const parts = key.split("/");
  return parts[parts.length - 1] || "cv.pdf";
}

function ensureTrailingSlash(prefix: string) {
  return prefix.endsWith("/") ? prefix : `${prefix}/`;
}

async function getCvDownloadUrl(): Promise<string | null> {
  const cfg = getS4Config();
  const cvPrefixRaw = getS4CvPrefix();
  if (!cfg || !cvPrefixRaw) return null;

  const prefix = ensureTrailingSlash(cvPrefixRaw);

  const client = new S3Client({
    endpoint: cfg.endpoint,
    region: cfg.region,
    forcePathStyle: true,
    credentials: {
      accessKeyId: cfg.accessKeyId,
      secretAccessKey: cfg.secretAccessKey,
    },
  });

  try {
    let token: string | undefined;

    do {
      const list = await client.send(
        new ListObjectsV2Command({
          Bucket: cfg.bucket,
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

export default async function CvPage() {
  const cvDownloadUrl = await getCvDownloadUrl();
  return <CvPageClient cvDownloadUrl={cvDownloadUrl} />;
}
