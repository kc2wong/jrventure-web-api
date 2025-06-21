import {
  createUser,
  User,
  UserRegistration,
} from '../__generated__/linkedup-backend-client';
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
