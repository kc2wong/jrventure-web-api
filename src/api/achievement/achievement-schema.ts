import { components, paths } from '@openapi/schema';

export type FindPendingAchievementQueryDto =
  paths['/achievements/status/pending']['get']['parameters']['query'];

export type FindPendingAchievement200ResponseDto =
  paths['/achievements/status/pending']['get']['responses']['200']['content']['application/json'];

export type CreateAchievementRequestDto =
  paths['/achievements']['post']['requestBody']['content']['application/json'];

export type CreateAchievement201ResponseDto =
  paths['/achievements']['post']['responses']['201']['content']['application/json'];

export type GetAchievementByIdPathDto =
  paths['/achievements/{id}']['get']['parameters']['path'];

export type GetAchievementById200ResponseDto =
  paths['/achievements/{id}']['get']['responses']['200']['content']['application/json'];

export type ReviewAchievementPathDto =
  paths['/achievements/{id}/review']['post']['parameters']['path'];

export type ReviewAchievementBodyDto =
  paths['/achievements/{id}/review']['post']['requestBody']['content']['application/json'];

export type ReviewAchievement201ResponseDto =
  paths['/achievements/{id}/review']['post']['responses']['201']['content']['application/json'];

export type RejectAchievementPathDto =
  paths['/achievements/{id}/rejection']['post']['parameters']['path'];

export type RejectAchievementBodyDto =
  paths['/achievements/{id}/rejection']['post']['requestBody']['content']['application/json'];

export type RejectAchievement201ResponseDto =
  paths['/achievements/{id}/rejection']['post']['responses']['201']['content']['application/json'];

export type ApproveAchievementPathDto =
  paths['/achievements/{id}/approval']['post']['parameters']['path'];

export type ApproveAchievement201ResponseDto =
  paths['/achievements/{id}/approval']['post']['responses']['201']['content']['application/json'];

export type GetAchievementByStudentActivityIdPathDto =
  paths['/students/{id}/activities/{activityId}/achievements']['get']['parameters']['path'];

export type GetAchievementByStudentActivityId200ResponseDto =
  paths['/students/{id}/activities/{activityId}/achievements']['get']['responses']['200']['content']['application/json'];
  
export type AchievementDto = components['schemas']['Achievement'];
export type AchievementCreationDto = components['schemas']['AchievementCreation'];
export type AchievementDetailDto = components['schemas']['AchievementDetail'];
export type AchievementStatusDto = components['schemas']['AchievementStatus'];
export type ApprovalCommentTypeDto = components['schemas']['ApprovalCommentType'];
export type AchievementApprovalReviewDto =
  components['schemas']['AchievementApprovalReview'];
export type AchievementAttachmentCreationDto =
  components['schemas']['AchievementAttachmentCreation'];
export type AchievementAttachmentDto = components['schemas']['AchievementAttachment'];
