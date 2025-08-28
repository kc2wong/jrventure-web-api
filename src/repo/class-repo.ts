import { findClass } from '@processapi/sdk.gen';
import { Class } from '@processapi/types.gen';

import { callRepo } from './repo-util';

export const findClassRepo = async (
  authorizationToken: string,
  grade?: number,
  classNumber?: string
): Promise<Class[]> => {
  return await callRepo(
    (headers) => findClass({ headers, query: { grade, classNumber } }),
    authorizationToken
  );
};
