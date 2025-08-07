import { UserNotFoundErrorDto } from '@api/shared/error-schema';
import { GetUserById200ResponseDto } from '@api/user/user-schema';
import { findUserRepo } from '@repo/user-repo';
import { entity2Dto } from '@service/user/mapper/user-mapper';
import { getCreatedUpdatedByService } from '@service/user/shared/enrich-user';

export const getUserByIdService = async (
  jwt: string,
  id: string
): Promise<GetUserById200ResponseDto> => {
  const users = (await findUserRepo(jwt, { id: [id] }));
  const user = users[0];
  if (user === undefined) {
    throw new UserNotFoundErrorDto(id);
  }
  const userMap = await getCreatedUpdatedByService(jwt, [user]);

  return entity2Dto(
    user,
    [],
    userMap.get(user.createdBy),
    userMap.get(user.updatedBy)
  );
};
