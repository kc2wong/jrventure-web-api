import { AchievementSubmissionRoleDto } from '@api/activity/activity-schema';
import { AchievementSubmissionRole } from '@processapi/types.gen';

export const entity2Dto = (src: AchievementSubmissionRole): AchievementSubmissionRoleDto => {
  return src;
};

export const dto2Entity = (src: AchievementSubmissionRoleDto): AchievementSubmissionRole => {
  return src;
};
