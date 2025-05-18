import {
  findUser as findUserRepo,
  createUser as createUserRepo,
  updateUser as updateUserRepo,
  User,
  UserCreation,
  UserRole,
  UserStatus,
} from '../__generated__/linkedup-backend-client';

import { callRepo } from './repo-util';

interface FindUserParams {
  id?: string[];
  email?: string;
  name?: string;
  studentId?: string;
  role?: UserRole[];
  status?: UserStatus[];
}

export const findUser = async (
  { id, email, name, studentId, role, status }: FindUserParams,
  authorizationToken?: string
): Promise<User[]> => {
  return await callRepo(
    () =>
      findUserRepo({
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

export const createUser = async (
  userCreation: UserCreation,
  authorizationToken?: string
): Promise<User> => {
  return await callRepo(
    () =>
      createUserRepo({
        body: userCreation,
      }),
    authorizationToken
  );
};

export const updateUser = async (
  userId: string,
  version: number,
  userUpdate: UserCreation,
  authorizationToken?: string
): Promise<User> => {
  return await callRepo(
    () =>
      updateUserRepo({
        path: { id: userId },
        body: { ...userUpdate, version },
      }),
    authorizationToken
  );
};
