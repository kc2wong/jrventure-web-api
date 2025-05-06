import { Student, User } from '../../../__generated__/linkedup-backend-client';
import { findStudent as findStudentRepo } from '../../../repo/student-repo';

export const getStudents = async (
  users: User[]
): Promise<Map<string, Student>> => {
  const studentIds = Array.from(
    new Set(users.flatMap((u) => u.entitledStudentId))
  );

  const students =
    studentIds.length > 0 ? await findStudentRepo(studentIds) : [];
  // Convert students array into a Map for fast lookup
  return new Map(students.map((s) => [s.id, s]));
};
