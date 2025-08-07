import {
  CreateUserRequestDto,
  CreateUser201ResponseDto,
} from '@api/user/user-schema';
import { User } from '@processapi/types.gen';
import { createUserRepo, updateUserRepo, findUserRepo } from '@repo/user-repo';
import { entity2Dto } from '@service/user/mapper/user-mapper';
import { dto2Entity as userRoleDto2Entity } from '@service/user/mapper/user-role-mapper';
import { dto2Entity as userStatusDto2Entity } from '@service/user/mapper/user-status-mapper';
import {
  getCreatedUpdatedByService,
  getEntitledStudentsService,
} from '@service/user/shared/enrich-user';

export const createUserService = async (
  jwt: string,
  request: CreateUserRequestDto
): Promise<CreateUser201ResponseDto> => {
  const { email, name, role, status, entitledStudentId, withApprovalRight } =
    request;

  let existingParent: User | undefined;
  if (role === 'Parent') {
    existingParent = (
      await findUserRepo(jwt, {
        email,
        role: [userRoleDto2Entity('Parent')],
      })
    )[0];
  }

  const newUser = existingParent
    ? await updateUserRepo(jwt, existingParent.id, existingParent.version, {
        email,
        name,
        role: userRoleDto2Entity(role),
        status: userStatusDto2Entity(status),
        entitledStudentId: [
          ...existingParent.entitledStudentId,
          ...entitledStudentId,
        ],
        withApprovalRight,
      })
    : await createUserRepo(
        {
          email,
          name,
          role: userRoleDto2Entity(role),
          status: userStatusDto2Entity(status),
          entitledStudentId: entitledStudentId ?? [],
          withApprovalRight,
        },
        jwt
      );

  const userMap = await getCreatedUpdatedByService(jwt, [newUser]);
  const studentMap = await getEntitledStudentsService(jwt, [newUser]);

  const userDto = entity2Dto(
    newUser,
    Array.from(studentMap.values()),
    userMap.get(newUser.createdBy),
    userMap.get(newUser.updatedBy)
  );
  return userDto;
};
