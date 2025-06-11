import { ApprovalCommentType as ApprovalCommentTypeEntity } from '../__generated__/linkedup-backend-client';
import { ApprovalCommentTypeDto } from '../rest/dto-schema';

export const entity2Dto = (
  src: ApprovalCommentTypeEntity
): ApprovalCommentTypeDto => {
  return src;
};

export const dto2Entity = (
  src: ApprovalCommentTypeDto
): ApprovalCommentTypeEntity => {
  return src;
};
