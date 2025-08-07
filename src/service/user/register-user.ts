import {
  RegisterUserRequestDto,
  RegisterUser201ResponseDto,
} from '@api/user/user-schema';
import { registerUserRepo } from '@repo/user-registration-repo';
import { entity2Dto } from '@service/user/mapper/user-mapper';
import {
  getCreatedUpdatedByService,
  getEntitledStudentsService,
} from '@service/user/shared/enrich-user';

export const registerUserService = async (
  jwt: string,
  request: RegisterUserRequestDto
): Promise<RegisterUser201ResponseDto> => {
  const { studentId, studentName, accessToken } = request;
  const newUser = await registerUserRepo(
    {
      accessToken,
      studentId,
      studentName,
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
