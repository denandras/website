import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getS4Config } from "@/lib/s4-config";

function fallbackContentType(name: string) {
  const ext = name.split(".").pop()?.toLowerCase();
  if (ext === "png") return "image/png";
  if (ext === "webp") return "image/webp";
  if (ext === "gif") return "image/gif";
  if (ext === "avif") return "image/avif";
  return "image/jpeg";
}

export async function GET(request: Request) {
  const cfg = getS4Config();
  if (!cfg) {
    return new Response("S4 configuration missing", { status: 500 });
  }

  const { searchParams } = new URL(request.url);
  const key = searchParams.get("key");
  const download = searchParams.get("download") === "1";
  const name = searchParams.get("name") || "image";

  if (!key) {
    return new Response("Missing key", { status: 400 });
  }

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
    const output = await client.send(
      new GetObjectCommand({
        Bucket: cfg.bucket,
        Key: key,
      }),
    );

    if (!output.Body) {
      return new Response("File not found", { status: 404 });
    }

    const stream = output.Body.transformToWebStream();
    const contentType = output.ContentType || fallbackContentType(name);
    const disposition = download
      ? `attachment; filename="${name.replace(/\"/g, "")}"`
      : "inline";

    return new Response(stream, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": disposition,
        "Cache-Control": "public, max-age=300",
      },
    });
  } catch {
    return new Response("Unable to fetch file", { status: 404 });
  }
}
