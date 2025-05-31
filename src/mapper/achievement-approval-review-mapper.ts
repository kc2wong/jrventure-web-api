import { AchievementApprovalReview as AchievementApprovalReviewEntity } from '../__generated__/linkedup-backend-client';
import {
  AchievementApprovalReviewDto,
  SimpleUserDto,
} from '../rest/dto-schema';

export const entity2Dto = (
  src: AchievementApprovalReviewEntity,
  createdBy: SimpleUserDto,
  updatedBy: SimpleUserDto
): AchievementApprovalReviewDto => {
  return { ...src, createdBy, updatedBy };
};