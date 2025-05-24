import {
  Activity as ActivityEntity,
  ActivityPayload as ActivityPayloadEntity,
} from '../__generated__/linkedup-backend-client';
import {
  SimpleUserDto,
  ActivityDto,
  ActivityDetailDto,
  ActivityPayloadDto,
} from '../rest/dto-schema';
import {
  entity2Dto as activityStatusEntity2Dto,
  dto2Entity as activityStatusDto2Entity,
} from './activity-status-mapper';
import {
  entity2Dto as achievementSubmissionRoleEntity2Dto,
  dto2Entity as achievementSubmissionRoleDto2Entity,
} from './achievement-submission-role-mapper';

export const entity2Dto = (src: ActivityEntity): ActivityDto => {
  const { status, achievementSubmissionRole, ...rest } = src;
  return {
    ...rest,
    achievementSubmissionRole: achievementSubmissionRoleEntity2Dto(
      achievementSubmissionRole
    ),
    status: activityStatusEntity2Dto(status),
  };
};

export const entity2DetailDto = (
  src: ActivityEntity,
  createdBy: SimpleUserDto,
  updatedBy: SimpleUserDto
): ActivityDetailDto => {
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

export const payloadDto2Entity = (
  src: ActivityPayloadDto
): ActivityPayloadEntity => {
  const { status, achievementSubmissionRole, ...rest } = src;
  return {
    ...rest,
    achievementSubmissionRole: achievementSubmissionRoleDto2Entity(
      achievementSubmissionRole
    ),
    status: activityStatusDto2Entity(status),
  };
};
