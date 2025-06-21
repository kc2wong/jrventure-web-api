import { ApprovalCommentType } from '@processapi/types.gen';
import { ApprovalCommentTypeDto } from '@api/achievement/achievement-schema';

export const entity2Dto = (
  src: ApprovalCommentType
): ApprovalCommentTypeDto => {
  return src;
};

export const dto2Entity = (
  src: ApprovalCommentTypeDto
): ApprovalCommentType => {
  return src;
};
