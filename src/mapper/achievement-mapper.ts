import {
  Achievement as AchievementEntity,
  AchievementDetail as AchievementDetailEntity,
  AchievementApproval as AchievementApprovalEntity,
  AchievementApprovalDetail as AchievementApprovalDetailEntity,
  AchievementCreation as AchievementCreationEntity,
  Activity,
  Student,
} from '../__generated__/linkedup-backend-client';
import {
  AchievementDto,
  AchievementCreationDto,
  AchievementDetailDto,
  SimpleUserDto,
} from '../rest/dto-schema';
import { entity2Dto as achievementApprovalReviewEntity2Dto } from './achievement-approval-review-mapper';
import { entity2Dto as achievementApprovalAttachmentEntity2Dto } from './achievement-approval-attachment-mapper';
import { entity2Dto as achievementStatusEntity2Dto } from './achievement-status-mapper';
import { entity2Dto as achievementSubmissionRoleEntity2Dto } from './achievement-submission-role-mapper';
import { entity2Dto as studentEntity2Dto } from './student-mapper';
import { entity2Dto as activityEntity2Dto } from './activity-mapper';

export const entity2Dto = (
  src: AchievementEntity | AchievementApprovalEntity,
  activity: Activity,
  student: Student
): AchievementDto => {
  const { status, submissionRole, ...rest } = src;
  if ('updatedAt' in src) {
    return {
      ...rest,
      submissionRole: achievementSubmissionRoleEntity2Dto(submissionRole),
      submissionDate: src.updatedAt,
      status: achievementStatusEntity2Dto(status),
      student: studentEntity2Dto(student),
      activity: activityEntity2Dto(activity),
    };
  }
  return {
    ...rest,
    submissionRole: achievementSubmissionRoleEntity2Dto(submissionRole),
    status: achievementStatusEntity2Dto(status),
    student: studentEntity2Dto(student),
    activity: activityEntity2Dto(activity),
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

export const detailEntity2Dto = (
  src: AchievementDetailEntity,
  activity: Activity,
  student: Student
): AchievementDetailDto => {
  const { status, submissionRole, attachment, ...rest } = src;
  return {
    ...rest,
    submissionRole: achievementSubmissionRoleEntity2Dto(submissionRole),
    status: achievementStatusEntity2Dto(status),
    student: studentEntity2Dto(student),
    activity: activityEntity2Dto(activity),
    review: [],
    attachment: attachment.map((atch) =>
      achievementApprovalAttachmentEntity2Dto(atch)
    ),
  };
};

export const approvalDetailEntity2Dto = (
  src: AchievementApprovalDetailEntity,
  activity: Activity,
  student: Student,
  simpleUserMap: Map<string, SimpleUserDto>
): AchievementDetailDto => {
  const { status, submissionRole, attachment, review, ...rest } = src;
  return {
    ...rest,
    submissionRole: achievementSubmissionRoleEntity2Dto(submissionRole),
    status: achievementStatusEntity2Dto(status),
    student: studentEntity2Dto(student),
    activity: activityEntity2Dto(activity),
    submissionDate: src.updatedAt,
    submittedBy: simpleUserMap.get(src.updatedBy),
    review: (review ?? []).map((r) =>
      achievementApprovalReviewEntity2Dto(
        r,
        simpleUserMap.get(r.createdBy)!,
        simpleUserMap.get(r.updatedAt)!
      )
    ),
    attachment: attachment.map((atch) =>
      achievementApprovalAttachmentEntity2Dto(atch)
    ),
  };
};
