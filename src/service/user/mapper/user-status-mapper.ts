import { UserStatus } from '@processapi/types.gen';
import { UserStatusDto } from '@api/user/user-schema';

export const entity2Dto = (src: UserStatus): UserStatusDto => {
  return src;
};

export const dto2Entity = (src: UserStatusDto): UserStatus => {
  return src;
};
