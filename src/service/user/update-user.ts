import {
  UpdateUserByIdRequestDto,
  UpdateUserById200ResponseDto,
} from '@api/user/user-schema';
import { updateUserRepo } from '@repo/user-repo';
import { entity2Dto } from '@service/user/mapper/user-mapper';
import { dto2Entity as userRoleDto2Entity } from '@service/user/mapper/user-role-mapper';
import { dto2Entity as userStatusDto2Entity } from '@service/user/mapper/user-status-mapper';
import {
  getCreatedUpdatedByService,
  getEntitledStudentsService,
} from '@service/user/shared/enrich-user';

export const updateUserService = async (
  jwt: string,
  id: string,
  request: UpdateUserByIdRequestDto
): Promise<UpdateUserById200ResponseDto> => {
  const {
    email,
    name,
    role,
    status,
    entitledStudentId,
    withApprovalRight,
    version,
  } = request;
  const updatedUser = await updateUserRepo(jwt, id, version, {
    email,
    name,
    role: userRoleDto2Entity(role),
    status: userStatusDto2Entity(status),
    entitledStudentId: entitledStudentId ?? [],
    withApprovalRight,
  });

  const userMap = await getCreatedUpdatedByService(jwt, [updatedUser]);
  const studentMap = await getEntitledStudentsService(jwt, [updatedUser]);

  const userDto = entity2Dto(
    updatedUser,
    Array.from(studentMap.values()),
    userMap.get(updatedUser.createdBy),
    userMap.get(updatedUser.updatedBy)
  );

  return userDto;
};
