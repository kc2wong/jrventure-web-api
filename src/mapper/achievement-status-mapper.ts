import {
  AchievementStatus as AchievementStatusEntity,
  AchievementApprovalStatus as AchievementApprovalStatusEntity,
} from '../__generated__/linkedup-backend-client';
import { AchievementStatusDto } from '../rest/dto-schema';

export const entity2Dto = (
  src: AchievementStatusEntity | AchievementApprovalStatusEntity
): AchievementStatusDto => {
  return src;
};

export const dto2Entity = (
  src: AchievementStatusDto
): AchievementStatusEntity | AchievementApprovalStatusEntity => {
  return src === 'New' ? 'Pending' : src;
};
