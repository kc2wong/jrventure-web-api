import { UserRole as UserRoleEntity } from '../__generated__/linkedup-backend-client';
import { UserRoleDto } from '../rest/dto-schema';

// const roleDto2EntityMap: Record<UserRoleDto, UserRoleEntity> = {
//   Student: UserRoleEntity.STUDENT,
//   Parent: UserRoleEntity.PARENT,
//   Teacher: UserRoleEntity.TEACHER,
//   Admin: UserRoleEntity.ADMIN,
//   Alumni: UserRoleEntity.ALUMNI,
// };

// const roleEntity2DtoMap: Record<UserRoleEntity, UserRoleDto> =
//   Object.fromEntries(
//     Object.entries(roleDto2EntityMap).map(([key, value]) => [value, key])
//   ) as Record<UserRoleEntity, UserRoleDto>;

export const entity2Dto = (src: UserRoleEntity): UserRoleDto => {
  // return roleEntity2DtoMap[src];
  return src;
};

export const dto2Entity = (src: UserRoleDto): UserRoleEntity => {
  // return roleDto2EntityMap[src];
  return src;
};
