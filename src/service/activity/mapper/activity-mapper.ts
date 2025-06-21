import {
  entity2Dto as activityStatusEntity2Dto,
  dto2Entity as activityStatusDto2Entity,
} from '@service/activity/mapper/activity-status-mapper';
import {
  entity2Dto as achievementSubmissionRoleEntity2Dto,
  dto2Entity as achievementSubmissionRoleDto2Entity,
} from '@service/activity/mapper/achievement-submission-role-mapper';
import { ActivityDto, ActivityDetailDto, ActivityPayloadDto } from '@api/activity/activity-schema';
import { Activity, ActivityPayload } from '@processapi/types.gen';
import { SimpleUserDto } from '@api/user/user-schema';

export const entity2Dto = (src: Activity): ActivityDto => {
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
  src: Activity,
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
): ActivityPayload => {
  const { status, achievementSubmissionRole, ...rest } = src;
  return {
    ...rest,
    achievementSubmissionRole: achievementSubmissionRoleDto2Entity(
      achievementSubmissionRole
    ),
    status: activityStatusDto2Entity(status),
  };
};
