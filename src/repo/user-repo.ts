import { createSystemError } from './error-util';
import { backendApiClient } from './backend-api-client';
import {
  User,
  UserCreation,
  UserRole,
  UserStatus,
} from '../__generated__/linkedup-backend-client';

interface FindUserParams {
  id?: number[];
  email?: string;
  name?: string;
  studentId?: string;
  role?: UserRole[];
  status?: UserStatus[];
}

export const findUser = async ({
  id,
  email,
  name,
  studentId,
  role,
  status,
}: FindUserParams): Promise<User[]> => {
  try {
    const u = await backendApiClient.userMaintenance.findUser(
      id?.map((i) => i.toString()),
      email,
      name,
      studentId,
      status,
      role
    );
    return u;
  } catch (error: any) {
    console.log(`backendApiClient error = ${JSON.stringify(error)}`);
    throw createSystemError(error);
  }
};

export const createUser = async (userCreation: UserCreation): Promise<User> => {
  try {
    return await backendApiClient.userMaintenance.createUser(userCreation);
  } catch (error: any) {
    throw createSystemError(error);
  }
};

export const updateUser = async (
  userId: string,
  version: number,
  userUpdate: UserCreation
): Promise<User> => {
  try {
    return await backendApiClient.userMaintenance.updateUser(userId, {
      ...userUpdate,
      version,
    });
  } catch (error: any) {
    throw createSystemError(error);
  }
};
