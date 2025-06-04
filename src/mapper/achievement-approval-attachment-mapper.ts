import {
  AchievementAttachmentCreation as AchievementAttachmentCreationEntity,
  AchievementAttachment as AchievementAttachmentEntity,
} from '../__generated__/linkedup-backend-client';
import {
  AchievementAttachmentCreationDto,
  AchievementAttachmentDto,
} from '../rest/dto-schema';

const uploadBucketName = 'jr-venture-media-upload-bucket';

export const creationDto2Entity = ({
  fileName,
  objectKey,
}: AchievementAttachmentCreationDto): AchievementAttachmentCreationEntity => {
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
}: AchievementAttachmentEntity): AchievementAttachmentDto => {
  return {
    fileName,
    objectKey,
    getUrl,
  };
};
