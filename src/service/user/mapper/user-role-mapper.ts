import { UserRole } from '@processapi/types.gen';
import { UserRoleDto } from '@api/user/user-schema';

export const entity2Dto = (src: UserRole): UserRoleDto => {
  return src;
};

export const dto2Entity = (src: UserRoleDto): UserRole => {
  return src;
};
