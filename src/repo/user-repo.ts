import { findUser, createUser, updateUser } from '@processapi/sdk.gen';
import {
  User,
  UserCreation,
  UserRole,
  UserStatus,
} from '@processapi/types.gen';

import { callRepo } from './repo-util';

interface FindUserParams {
  id?: string[];
  email?: string;
  name?: string;
  studentId?: string;
  role?: UserRole[];
  status?: UserStatus[];
}

export const findUserRepo = async (
  authorizationToken: string,
  { id, email, name, studentId, role, status }: FindUserParams
): Promise<User[]> => {
  return await callRepo(
    (headers) =>
      findUser({
        headers,
        query: {
          id,
          email,
          name,
          studentId,
          status,
          role,
        },
      }),
    authorizationToken
  );
};

export const createUserRepo = async (
  userCreation: UserCreation,
  authorizationToken: string
): Promise<User> => {
  return await callRepo(
    (headers) => createUser({ headers, body: userCreation }),
    authorizationToken
  );
};

export const updateUserRepo = async (
  authorizationToken: string,
  userId: string,
  version: number,
  userUpdate: UserCreation
): Promise<User> => {
  return await callRepo(
    (headers) =>
      updateUser({
        headers,
        path: { id: userId },
        body: { ...userUpdate, version },
      }),
    authorizationToken
  );
};
