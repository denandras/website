import type { Metadata } from "next";
import { ListObjectsV2Command, S3Client } from "@aws-sdk/client-s3";
import { getMediaTokenSecret, getS4ArtPrefix, getS4Config } from "@/lib/s4-config";
import { cookies } from "next/headers";
import { normalizeSiteLanguage, SITE_LANGUAGE_COOKIE } from "@/lib/site-language";
import { createMediaAccessToken } from "@/lib/media-access-token";
import ArtPageClient from "@/components/art-page-client";

type MediaItem = {
  id: string;
  viewUrl: string;
  downloadUrl: string;
};

const IMAGE_EXTENSIONS = new Set(["jpg", "jpeg", "png", "webp", "gif", "avif"]);

export const metadata: Metadata = {
  title: "Visual Art – András Dénes",
  description: "Visual art and photography by András Dénes – urban landscapes, street scenes, and the interplay of light.",
  openGraph: {
    title: "Visual Art – András Dénes",
    description: "Visual art and photography by András Dénes – urban landscapes, street scenes, and the interplay of light.",
    url: "https://andrasdenes.com/art",
  },
};

export const dynamic = "force-dynamic";

function isImageKey(key: string) {
  const ext = key.split(".").pop()?.toLowerCase();
  return !!ext && IMAGE_EXTENSIONS.has(ext);
}

function fileExtension(key: string) {
  return key.split(".").pop()?.toLowerCase() ?? "jpg";
}

async function getArtItems(): Promise<MediaItem[]> {
  const cfg = getS4Config();
  const tokenSecret = getMediaTokenSecret();
  const artPrefix = getS4ArtPrefix();
  if (!cfg || !tokenSecret || !artPrefix) return [];

  const client = new S3Client({
    endpoint: cfg.endpoint,
    region: cfg.region,
    forcePathStyle: true,
    credentials: {
      accessKeyId: cfg.accessKeyId,
      secretAccessKey: cfg.secretAccessKey,
    },
  });

  const keys: string[] = [];
  let token: string | undefined;

  do {
    const list = await client.send(
      new ListObjectsV2Command({
        Bucket: cfg.bucket,
        Prefix: artPrefix,
        ContinuationToken: token,
        MaxKeys: 500,
      }),
    );

    for (const obj of list.Contents ?? []) {
      if (!obj.Key) continue;
      if (!isImageKey(obj.Key)) continue;
      keys.push(obj.Key);
    }

    token = list.IsTruncated ? list.NextContinuationToken : undefined;
  } while (token);

  const sortedKeys = [...keys].sort((a, b) => b.localeCompare(a));

  return sortedKeys.map((key, index) => {
    const ext = fileExtension(key);
    const ordinal = String(index + 1).padStart(3, "0");
    const safeName = `andras-denes-art-${ordinal}.${ext}`;
    const accessToken = createMediaAccessToken(
      {
        key,
        name: safeName,
        exp: Date.now() + 1000 * 60 * 60 * 24,
      },
      tokenSecret,
    );
    const encodedToken = encodeURIComponent(accessToken);

    return {
      id: `${index}`,
      viewUrl: `/api/media/file?token=${encodedToken}`,
      downloadUrl: `/api/media/file?token=${encodedToken}&download=1`,
    };
  });
}

export default async function ArtPage() {
  const cookieStore = await cookies();
  const language = normalizeSiteLanguage(cookieStore.get(SITE_LANGUAGE_COOKIE)?.value);
  const labels = language === "hu"
    ? {
        missingConfig: "Az S3 képzőművészeti környezeti változók nincsenek beállítva.",
        noMedia: "A beállított mappában nem találhatók képek.",
      }
    : {
        missingConfig: "S3 art environment variables are not configured. Add S4_ART_PREFIX in .env.local.",
        noMedia: "No images found in the configured folder.",
      };

  const artItems = await getArtItems();
  const hasConfig = !!getS4Config() && !!getS4ArtPrefix();

  return (
    <ArtPageClient
      initialLanguage={language}
      items={artItems}
      hasConfig={hasConfig}
      missingConfigLabel={labels.missingConfig}
      noMediaLabel={labels.noMedia}
    />
  );
}
