import { Activity as ActivityEntity } from '../__generated__/linkedup-backend-client';
import { SimpleUserDto, ActivityDto } from '../rest/dto-schema';
import { entity2Dto as activityStatusEntity2Dto } from './activity-status-mapper';
import { entity2Dto as achievementSubmissionRoleEntity2Dto } from './achievement-submission-role-mapper';

export const entity2Dto = (
  src: ActivityEntity,
  createdBy: SimpleUserDto,
  updatedBy: SimpleUserDto
): ActivityDto => {
  const { status, achievementSubmissionRole, ...others } = src;
  return {
    ...others,
    achievementSubmissionRole: achievementSubmissionRoleEntity2Dto(
      achievementSubmissionRole
    ),
    status: activityStatusEntity2Dto(status),
    createdBy,
    updatedBy,
  };
};
