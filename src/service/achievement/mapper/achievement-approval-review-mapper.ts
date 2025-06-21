import { AchievementApprovalReview } from '@processapi/types.gen';
import { AchievementApprovalReviewDto } from '@api/achievement/achievement-schema';
import { entity2Dto as approvalCommentTypeEntity2Dto } from '@service/achievement/mapper/approval-comment-type-mapper';
import { SimpleUserDto } from '@api/user/user-schema';

export const entity2Dto = (
  { commentType, ...rest }: AchievementApprovalReview,
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
