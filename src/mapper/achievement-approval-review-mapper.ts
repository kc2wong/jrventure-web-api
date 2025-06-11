import { AchievementApprovalReview as AchievementApprovalReviewEntity } from '../__generated__/linkedup-backend-client';
import {
  AchievementApprovalReviewDto,
  SimpleUserDto,
} from '../rest/dto-schema';
import { entity2Dto as approvalCommentTypeEntity2Dto } from './approval-comment-type-mapper';

export const entity2Dto = (
  { commentType, ...rest }: AchievementApprovalReviewEntity,
  createdBy: SimpleUserDto,
  updatedBy: SimpleUserDto
): AchievementApprovalReviewDto => {
  return {
    ...rest,
    commentType: approvalCommentTypeEntity2Dto(commentType),
    createdBy,
    updatedBy,
  };
};
