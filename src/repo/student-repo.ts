import {
  findStudent as findStudentRepo,
  Student,
} from '../__generated__/linkedup-backend-client';
import { callRepo } from './repo-util';

export const getStudentById = async (
  id: string,
  authorizationToken?: string
): Promise<Student | undefined> => {
  const result = await callRepo(
    () =>
      findStudentRepo({
        query: { id: [id] },
      }),
    authorizationToken
  );
  return result.length === 1 ? result[0] : undefined;
};

export const findStudent = async (
  ids?: string[],
  classId?: string,
  name?: string,
  authorizationToken?: string
): Promise<Student[]> => {
  return await callRepo(
    () =>
      findStudentRepo({
        query: { id: ids, classId, name },
      }),
    authorizationToken
  );
};
