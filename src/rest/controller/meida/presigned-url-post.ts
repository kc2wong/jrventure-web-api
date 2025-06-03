import { Request, Response, NextFunction } from 'express';
import {
  PresignedUrlPost200ResponseDto,
  PresignedUrlPostRequestBodyDto,
} from '../../dto-schema';
import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
} from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { privateBucketName, s3client } from '../s3-util';

export const generatePresignedUrl = async (
  req: Request<{}, {}, PresignedUrlPostRequestBodyDto, {}>,
  res: Response<PresignedUrlPost200ResponseDto>,
  next: NextFunction
) => {
  try {
    const contentType = req.body.contentType;
    const extension = contentType.split('/').pop();

    const objectKey = `${uuidv4()}.${extension}`;
    const putObjectCommand = new PutObjectCommand({
      Bucket: privateBucketName,
      Key: objectKey,
      ContentType: contentType,
    });
    const putUrl = await getSignedUrl(s3client, putObjectCommand, {
      // 5 minutes
      expiresIn: 300,
    });

    const getObjectCommand = new GetObjectCommand({
      Bucket: privateBucketName,
      Key: objectKey,
    });
    const getUrl = await getSignedUrl(s3client, getObjectCommand, {
      // 1 hr
      expiresIn: 3600,
    });

    const deleteObjectCommand = new DeleteObjectCommand({
      Bucket: privateBucketName,
      Key: objectKey,
    });
    const deleteUrl = await getSignedUrl(s3client, deleteObjectCommand, {
      // 1 hr
      expiresIn: 3600,
    });
    res.status(200).json({ objectKey, putUrl, getUrl, deleteUrl });
  } catch (error: any) {
    next(error);
  }
};
