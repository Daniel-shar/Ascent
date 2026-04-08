import { randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, extname, join } from "node:path";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { prisma } from "@/lib/db";
import {
  getS3Config,
  maxAttachmentCount,
  maxAttachmentSizeBytes,
} from "@/lib/portal-config";
import type { AttachmentRecord } from "@/lib/tickets/contracts";

const allowedMimePrefixes = ["image/"];

function sanitizeBaseName(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);
}

function getAttachmentUrl(storageKey: string) {
  const s3 = getS3Config();

  if (!s3) {
    return `/uploads/${storageKey}`;
  }

  if (s3.publicBaseUrl) {
    return `${s3.publicBaseUrl.replace(/\/$/, "")}/${storageKey}`;
  }

  if (s3.endpoint) {
    return `${s3.endpoint.replace(/\/$/, "")}/${s3.bucket}/${storageKey}`;
  }

  return `https://${s3.bucket}.s3.${s3.region}.amazonaws.com/${storageKey}`;
}

function serializeAttachment(attachment: {
  id: string;
  fileName: string;
  originalName: string;
  mimeType: string;
  sizeBytes: number;
  url: string;
  createdAt: Date;
}): AttachmentRecord {
  return {
    id: attachment.id,
    fileName: attachment.fileName,
    originalName: attachment.originalName,
    mimeType: attachment.mimeType,
    sizeBytes: attachment.sizeBytes,
    url: attachment.url,
    createdAt: attachment.createdAt.toISOString(),
  };
}

async function uploadBuffer(storageKey: string, mimeType: string, body: Buffer) {
  const s3 = getS3Config();

  if (!s3) {
    const targetPath = join(process.cwd(), "public", "uploads", storageKey);
    await mkdir(dirname(targetPath), { recursive: true });
    await writeFile(targetPath, body);
    return;
  }

  const client = new S3Client({
    region: s3.region,
    endpoint: s3.endpoint,
    forcePathStyle: s3.forcePathStyle,
    credentials: s3.credentials,
  });

  await client.send(
    new PutObjectCommand({
      Bucket: s3.bucket,
      Key: storageKey,
      Body: body,
      ContentType: mimeType,
    }),
  );
}

export async function storeUpload(file: File, uploadedById: string) {
  if (!allowedMimePrefixes.some((prefix) => file.type.startsWith(prefix))) {
    throw new Error("Please upload an image file.");
  }

  if (file.size > maxAttachmentSizeBytes) {
    throw new Error("Each attachment must be 10MB or smaller.");
  }

  const extension = extname(file.name) || ".png";
  const baseName = sanitizeBaseName(file.name.replace(extension, "")) || "attachment";
  const storageKey = `tickets/${new Date().getFullYear()}/${randomUUID()}-${baseName}${extension}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  await uploadBuffer(storageKey, file.type || "application/octet-stream", buffer);

  const attachment = await prisma.attachment.create({
    data: {
      fileName: `${baseName}${extension}`,
      originalName: file.name,
      mimeType: file.type || "application/octet-stream",
      sizeBytes: file.size,
      storageKey,
      url: getAttachmentUrl(storageKey),
      uploadedById,
    },
  });

  return serializeAttachment(attachment);
}

export async function storeUploads(files: File[], uploadedById: string) {
  if (files.length > maxAttachmentCount) {
    throw new Error(`Please upload up to ${maxAttachmentCount} attachments.`);
  }

  return Promise.all(files.map((file) => storeUpload(file, uploadedById)));
}
