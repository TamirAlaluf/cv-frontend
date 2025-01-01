// lib/s3.ts
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";


export const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function uploadToS3(
  base64Content: string,
  userId: string,
  jobTitle?: string
) {
  const buffer = Buffer.from(base64Content, "base64");
  const timestamp = new Date().toISOString();
  const key = `resumes/${userId}/${
    jobTitle ? jobTitle + "_" : ""
  }${timestamp}.pdf`;

  const params = {
    Bucket: process.env.S3_BUCKET_NAME!,
    Key: key,
    Body: buffer,
    ContentType: "application/pdf",
  };

  try {
    const command = new PutObjectCommand(params);
    const response = await s3Client.send(command);

    return {
      key,
      location: `https://${params.Bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`,
    };
  } catch (error) {
    console.error("S3 Upload Error:", error);
    throw error;
  }
}


export async function getPresignedUrl(key: string): Promise<string> {
  console.log("AWS Region:", process.env.AWS_REGION);
  console.log("S3 Bucket Name:", process.env.S3_BUCKET_NAME);

  const command = new GetObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME!,
    Key: key,
  });

  try {
    return await getSignedUrl(s3Client, command, { expiresIn: 3600 }); // 1 hour expiration
  } catch (error) {
    console.error("Error generating presigned URL:", error);
    throw error;
  }
}
