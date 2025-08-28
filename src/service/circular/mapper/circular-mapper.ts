import {
  CircularDetailDto,
  CircularDto,
  CircularPayloadDto,
} from '@api/circular/circular-schema';
import { SimpleUserDto } from '@api/user/user-schema';
import {
  Circular,
  CircularDetail,
  CircularPayload,
} from '@processapi/types.gen';
import {
  entity2Dto as circularAttachmentEntity2Dto,
  payloadDto2Entity as circularAttachmentPayloadDto2Entity,
} from '@service/circular/mapper/circular-attachment-mapper';
import { entity2Dto as circularStatusEntity2Dto } from '@service/circular/mapper/circular-status-mapper';

export const entity2Dto = (src: Circular): CircularDto => {
  const { forClass, status, distributedBy, ...rest } = src;
  return {
    ...rest,
    forClass: forClass ? `${forClass.grade}${forClass.classNumber}` : undefined,
    status: circularStatusEntity2Dto(status),
  };
};

export const entity2DetailDto = (
  src: CircularDetail,
  createdBy: SimpleUserDto,
  updatedBy: SimpleUserDto,
  distributedBy?: SimpleUserDto
): CircularDetailDto => {
  const { attachment, createdAt, updatedAt, distributedAt, version } = src;

  return {
    ...entity2Dto(src),
    createdBy,
    createdAt,
    updatedBy,
    updatedAt,
    distributedBy,
    distributedAt,
    attachment: (attachment ?? []).map((a) => circularAttachmentEntity2Dto(a)),
    version,
  };
};

export const payloadDto2Entity = (
  src: CircularPayloadDto,
  defaultBucketName: string
): CircularPayload => {
  const { attachment, ...rest } = src;
  return {
    ...rest,
    attachment: (attachment ?? []).map((a) =>
      circularAttachmentPayloadDto2Entity(a, defaultBucketName)
    ),
  };
};
