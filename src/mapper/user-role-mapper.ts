import { UserRole as UserRoleEntity } from '../__generated__/linkedup-backend-client';
import { UserRoleDto } from '../rest/dto-schema';


export const entity2Dto = (src: UserRoleEntity): UserRoleDto => {
  return src;
};

export const dto2Entity = (src: UserRoleDto): UserRoleEntity => {
  return src;
};
