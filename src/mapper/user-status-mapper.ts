import { UserStatus as UserStatusEntity } from '../__generated__/linkedup-backend-client';
import { UserStatusDto } from '../rest/dto-schema';

export const entity2Dto = (src: UserStatusEntity): UserStatusDto => {
  return src;
};

export const dto2Entity = (src: UserStatusDto): UserStatusEntity => {
  return src;
};
