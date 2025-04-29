import {
  S3Client,
  PutObjectCommand,
  PutObjectCommandInput,
} from "@aws-sdk/client-s3";
import { env } from "../config/env";

const s3 = new S3Client({
  region: "us-west-2",
  credentials: {
    accessKeyId: env.aws.accessKeyId,
    secretAccessKey: env.aws.secretAccessKey,
  },
});

interface UploadParams {
  originalname: string;
  mimetype: string;
  buffer: Buffer;
}

export async function uploadToS3({
  originalname,
  mimetype,
  buffer,
}: UploadParams) {
  const filename = `${Date.now()}-${originalname}`;

  const params: PutObjectCommandInput = {
    Bucket: env.aws.bucket,
    Key: filename,
    Body: buffer,
    ContentType: mimetype,
  };

  await s3.send(new PutObjectCommand(params));

  return {
    Location: `https://${env.aws.bucket}.s3.amazonaws.com/${filename}`,
    Key: filename,
  };
}
