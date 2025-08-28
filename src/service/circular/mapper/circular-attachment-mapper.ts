import {
  CircularAttachmentDto,
  CircularAttachmentPayloadDto,
} from '@api/circular/circular-schema';
import {
  CircularAttachment,
  CircularAttachmentPayload,
} from '@processapi/types.gen';

export const entity2Dto = (src: CircularAttachment): CircularAttachmentDto => {
  return {
    ...src,
  };
};

export const payloadDto2Entity = (
  src: CircularAttachmentPayloadDto,
  defaultBucketName: string
): CircularAttachmentPayload => {
  const { bucketName, ...rest } = src;
  return {
    ...rest,
    bucketName: bucketName ?? defaultBucketName,
  };
};
