import {
  CopyObjectCommand,
  DeleteObjectCommand,
  HeadObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';

export const s3client = new S3Client({});

export const privateBucketName = 'jr-venture-media-upload-bucket';

export const doesFileExist = async (
  bucket: string,
  key: string
): Promise<boolean> => {
  try {
    await s3client.send(new HeadObjectCommand({ Bucket: bucket, Key: key }));
    return true; // exists
  } catch (err: any) {
    return false;
  }
};

export const copyObject = async (
  bucket: string,
  oldKey: string,
  newKey: string
) => {
  // 1. Copy the object
  await s3client.send(
    new CopyObjectCommand({
      Bucket: bucket,
      CopySource: `${bucket}/${oldKey}`, // source bucket/key
      Key: newKey, // new key
    })
  );
};

export const renameObject = async (
  bucket: string,
  oldKey: string,
  newKey: string
) => {
  // 1. Copy the object
  await s3client.send(
    new CopyObjectCommand({
      Bucket: bucket,
      CopySource: `${bucket}/${oldKey}`, // source bucket/key
      Key: newKey, // new key
    })
  );

  // 2. Delete the original
  await s3client.send(
    new DeleteObjectCommand({
      Bucket: bucket,
      Key: oldKey,
    })
  );
};
