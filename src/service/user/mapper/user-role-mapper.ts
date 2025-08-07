import { UserRoleDto } from '@api/user/user-schema';
import { UserRole } from '@processapi/types.gen';

export const entity2Dto = (src: UserRole): UserRoleDto => {
  return src;
};

export const dto2Entity = (src: UserRoleDto): UserRole => {
  return src;
};
