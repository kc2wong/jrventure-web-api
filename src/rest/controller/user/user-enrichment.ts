import { AuditControl, Student, User } from '../../../__generated__/linkedup-backend-client';
import { findStudent as findStudentRepo } from '../../../repo/student-repo';
import { findUser as findUserRepo } from '../../../repo/user-repo';
import { SimpleUserDto } from '../../dto-schema';

const unknownUser: SimpleUserDto = {
  id: '-1',
  email: 'unknown@jrventure.org',
  name: { English: 'Unknown User' },
};

export const getStudents = async (
  users: User[],
  authorizationToken?: string
): Promise<Map<string, Student>> => {
  const studentIds = Array.from(
    new Set(users.flatMap((u) => u.entitledStudentId))
  );

  const students =
    studentIds.length > 0
      ? await findStudentRepo(studentIds, authorizationToken)
      : [];
  // Convert students array into a Map for fast lookup
  return new Map(students.map((s) => [s.id, s]));
};

export const getCreatedUpdatedBy = async (
  auditControl: AuditControl[]
): Promise<Map<string, SimpleUserDto>> => {
  const userIds = [
    ...new Set([
      ...auditControl.map((u) => u.createdBy),
      ...auditControl.map((u) => u.updatedBy),
    ]),
  ];
  const createdUpdatedBy = await findUserRepo({
    id: userIds,
  });
  const userMap = new Map(
    createdUpdatedBy.map(({ id, name, email }) => [id, { id, name, email }])
  );
  for (const id of userIds) {
    if (!userMap.has(id)) {
      userMap.set(id, unknownUser);
    }
  }

  return userMap;
};