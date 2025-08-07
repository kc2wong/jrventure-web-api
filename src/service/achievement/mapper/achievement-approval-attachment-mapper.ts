import {
  AchievementAttachmentCreationDto,
  AchievementAttachmentDto,
} from '@api/achievement/achievement-schema';
import {
  AchievementAttachmentCreation,
  AchievementAttachment,
} from '@processapi/types.gen';
import { privateBucketName } from '@util/s3-util';

const uploadBucketName = privateBucketName;

export const creationDto2Entity = ({
  fileName,
  objectKey,
}: AchievementAttachmentCreationDto): AchievementAttachmentCreation => {
  return {
    fileName,
    bucketName: objectKey.indexOf('/') === -1 ? uploadBucketName : undefined,
    objectKey,
  };
};

export const entity2Dto = ({
  fileName,
  objectKey,
  getUrl,
}: AchievementAttachment): AchievementAttachmentDto => {
  return {
    fileName,
    objectKey,
    getUrl,
  };
};
