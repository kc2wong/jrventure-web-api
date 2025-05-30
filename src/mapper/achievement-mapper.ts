import {
  Achievement as AchievementEntity,
  AchievementApproval as AchievementApprovalEntity,
  AchievementCreation as AchievementCreationEntity,
} from '../__generated__/linkedup-backend-client';
import { AchievementDto, AchievementCreationDto } from '../rest/dto-schema';
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
