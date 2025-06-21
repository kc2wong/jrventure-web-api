import {
  AchievementStatus,
  AchievementApprovalStatus,
} from '@processapi/types.gen';
import { AchievementStatusDto } from '@api/achievement/achievement-schema';

export const entity2Dto = (
  src: AchievementStatus | AchievementApprovalStatus
): AchievementStatusDto => {
  return src;
};

export const dto2Entity = (
  src: AchievementStatusDto
): AchievementStatus | AchievementApprovalStatus => {
  return src === 'New' ? 'Pending' : src;
};
