import { UserStatus as UserStatusEntity } from '../__generated__/linkedup-backend-client';
import { UserStatusDto } from '../rest/dto-schema';

const statusDto2EntityMap: Record<UserStatusDto, UserStatusEntity> = {
  Active: UserStatusEntity.ACTIVE,
  Inactive: UserStatusEntity.INACTIVE,
  Suspend: UserStatusEntity.SUSPEND,
};

const statusEntity2DtoMap: Record<UserStatusEntity, UserStatusDto> =
  Object.fromEntries(
    Object.entries(statusDto2EntityMap).map(([key, value]) => [value, key])
  ) as Record<UserStatusEntity, UserStatusDto>;

export const entity2Dto = (src: UserStatusEntity): UserStatusDto => {
  return statusEntity2DtoMap[src];
};

export const dto2Entity = (src: UserStatusDto): UserStatusEntity => {
  return statusDto2EntityMap[src];
};
