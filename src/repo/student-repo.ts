import { findStudent } from '@processapi/sdk.gen';
import { Student } from '@processapi/types.gen';

import { callRepo } from './repo-util';

export const getStudentByIdRepo = async (
  authorizationToken: string,
  id: string
): Promise<Student | undefined> => {
  const result = await callRepo(
    (headers) =>
      findStudent({
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
    (headers) => findStudent({ headers, query: { id: ids, classId, name } }),
    authorizationToken
  );
};
