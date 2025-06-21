import {
  AuditControl,
  Student,
  User,
} from '@processapi/types.gen';
import { DefaultMap } from '@type/default-map';
import { findStudentRepo } from '@repo/student-repo';
import { findUserRepo } from '@repo/user-repo';
import { SimpleUserDto } from '@api/user/user-schema';

const unknownUser: SimpleUserDto = {
  id: '-1',
  email: 'unknown@jrventure.org',
  name: { English: 'Unknown User' },
};

export const getEntitledStudentsService = async (
  authorizationToken: string,
  users: User[]
): Promise<Map<string, Student>> => {
  const studentIds = Array.from(
    new Set(users.flatMap((u) => u.entitledStudentId))
  );

  const students =
    studentIds.length > 0
      ? await findStudentRepo(authorizationToken, studentIds)
      : [];
  // Convert students array into a Map for fast lookup
  return new Map(students.map((s) => [s.id, s]));
};

export const getCreatedUpdatedByService = async (
  authorizationToken: string,
  auditControl: AuditControl[]
): Promise<DefaultMap<SimpleUserDto>> => {
  const userIds = [
    ...new Set([
      ...auditControl.map((u) => u.createdBy),
      ...auditControl.map((u) => u.updatedBy),
    ]),
  ];
  const createdUpdatedBy = await findUserRepo(
    authorizationToken,
    {
      id: userIds,
    },
  );
  const userMap = new Map(
    createdUpdatedBy.map(({ id, name, email }) => [id, { id, name, email }])
  );
  for (const id of userIds) {
    if (!userMap.has(id)) {
      userMap.set(id, unknownUser);
    }
  }

  return new DefaultMap<SimpleUserDto>(() => unknownUser, Array.from(userMap.entries()));
};
