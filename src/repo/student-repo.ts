import {
  findStudent as findStudentApi,
  Student,
} from '../__generated__/linkedup-backend-client';
import { callRepo } from './repo-util';

export const getStudentByIdRepo = async (
  id: string,
  authorizationToken: string
): Promise<Student | undefined> => {
  const result = await callRepo(
    (headers) =>
      findStudentApi({
        headers,
        query: { id: [id] },
      }),
    authorizationToken
  );
  return result.length === 1 ? result[0] : undefined;
};

export const findStudentRepo = async (
  authorizationToken: string,
  ids?: string[],
  classId?: string,
  name?: string
): Promise<Student[]> => {
  return await callRepo(
    (headers) =>
      findStudentApi({ headers, query: { id: ids, classId, name } }),
    authorizationToken
  );
};
