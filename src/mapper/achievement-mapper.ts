import {
  Achievement as AchievementEntity,
  AchievementApproval as AchievementApprovalEntity,
  AchievementApprovalDetail as AchievementApprovalDetailEntity,
  AchievementCreation as AchievementCreationEntity,
} from '../__generated__/linkedup-backend-client';
import {
  AchievementDto,
  AchievementCreationDto,
  SimpleUserDto,
} from '../rest/dto-schema';
import { entity2Dto as achievementApprovalReviewEntity2Dto } from './achievement-approval-review-mapper';
import { entity2Dto as achievementStatusEntity2Dto } from './achievement-status-mapper';
import { entity2Dto as achievementSubmissionRoleEntity2Dto } from './achievement-submission-role-mapper';

export const entity2Dto = (
  src: AchievementEntity | AchievementApprovalEntity
): AchievementDto => {
  const { status, submissionRole, ...rest } = src;
  return {
    ...rest,
    submissionRole: achievementSubmissionRoleEntity2Dto(submissionRole),
    status: achievementStatusEntity2Dto(status),
  };
};

export const creationDto2Entity = (
  src: AchievementCreationDto
): AchievementCreationEntity => {
  const { activityId, studentId, rating, comment } = src;
  return {
    activityId,
    studentId,
    rating: rating && rating > 0 ? rating : undefined,
    comment,
  };
};

export const approvalDetailEntity2Dto = (
  src: AchievementApprovalDetailEntity,
  simpleUserMap: Map<string, SimpleUserDto>
): AchievementDto => {
  const { status, submissionRole, review, ...rest } = src;
  return {
    ...rest,
    submissionRole: achievementSubmissionRoleEntity2Dto(submissionRole),
    status: achievementStatusEntity2Dto(status),
    review: (review ?? []).map((r) =>
      achievementApprovalReviewEntity2Dto(
        r,
        simpleUserMap.get(r.createdBy)!,
        simpleUserMap.get(r.updatedAt)!
      )
    ),
  };
};
