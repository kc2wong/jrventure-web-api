import { FindUserQueryDto, UserDto } from '@api/user/user-schema';
import { findUserRepo } from '@repo/user-repo';
import { entity2Dto } from '@service/user/mapper/user-mapper';
import { dto2Entity as roleDto2Entity } from '@service/user/mapper/user-role-mapper';
import { dto2Entity as statusDto2Entity } from '@service/user/mapper/user-status-mapper';
import {
  getCreatedUpdatedByService,
  getEntitledStudentsService,
} from '@service/user/shared/enrich-user';
import { asArray } from '@util/array-util';

export const findUserService = async (
  jwt: string,
  query: FindUserQueryDto
): Promise<UserDto[]> => {
  const email = query.email;
  const name = query.name;
  const studentId = query.studentId;
  const role = asArray(query.role);
  const status = asArray(query.status);

  const result = await findUserRepo(jwt, {
    email,
    name,
    studentId,
    role: role ? role.map((r) => roleDto2Entity(r)) : undefined,
    status: status ? status.map((s) => statusDto2Entity(s)) : undefined,
  });

  const createdUpdatedByMap = await getCreatedUpdatedByService(jwt, result);
  const studentMap = await getEntitledStudentsService(jwt, result);
  return result.map((u) =>
    entity2Dto(
      u,
      u.entitledStudentId
        .map((id) => studentMap.get(id))
        .filter((s) => s !== undefined),
      createdUpdatedByMap.get(u.createdBy),
      createdUpdatedByMap.get(u.updatedBy)
    )
  );
};
