import {
  Achievement,
  AchievementDetail,
  AchievementApproval,
  AchievementApprovalDetail,
  AchievementCreation,
  Activity,
  Student,
} from '@processapi/types.gen';
import {
  AchievementDto,
  AchievementCreationDto,
  AchievementDetailDto,
} from '@api/achievement/achievement-schema';
import { entity2Dto as achievementApprovalReviewEntity2Dto } from '@service/achievement/mapper/achievement-approval-review-mapper';
import { entity2Dto as achievementApprovalAttachmentEntity2Dto } from './achievement-approval-attachment-mapper';
import { entity2Dto as achievementStatusEntity2Dto } from './achievement-status-mapper';
import { entity2Dto as achievementSubmissionRoleEntity2Dto } from '@service/activity/mapper/achievement-submission-role-mapper';
import { entity2Dto as studentEntity2Dto } from '@service/student/mapper/student-mapper';
import { entity2Dto as activityEntity2Dto } from '@service/activity/mapper/activity-mapper';
import { SimpleUserDto } from '@api/user/user-schema';

export const entity2Dto = (
  src: Achievement | AchievementApproval,
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
): AchievementCreation => {
  const { activityId, studentId, rating, comment } = src;
  return {
    activityId,
    studentId,
    rating: rating && rating > 0 ? rating : undefined,
    comment,
  };
};

export const detailEntity2Dto = (
  src: AchievementDetail,
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
  src: AchievementApprovalDetail,
  activity: Activity,
  student: Student,
  createdBy: SimpleUserDto,
  updatedBy: SimpleUserDto,
  submittedBy?: SimpleUserDto
): AchievementDetailDto => {
  const { status, submissionRole, attachment, review, ...rest } = src;
  return {
    ...rest,
    submissionRole: achievementSubmissionRoleEntity2Dto(submissionRole),
    status: achievementStatusEntity2Dto(status),
    student: studentEntity2Dto(student),
    activity: activityEntity2Dto(activity),
    submissionDate: src.updatedAt,
    submittedBy: submittedBy,
    review: (review ?? []).map((r) =>
      achievementApprovalReviewEntity2Dto(r, createdBy, updatedBy)
    ),
    attachment: attachment.map((atch) =>
      achievementApprovalAttachmentEntity2Dto(atch)
    ),
  };
};
