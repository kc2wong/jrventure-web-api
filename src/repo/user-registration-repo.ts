import { createUser, User, UserRegistration } from '@processapi/index';

import { callRepo } from './repo-util';

export const registerUserRepo = async (
  userRegistration: UserRegistration,
  authorizationToken: string
): Promise<User> => {
  return await callRepo(
    (headers) => createUser({ headers, body: userRegistration }),
    authorizationToken
  );
};
