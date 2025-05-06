import { createSystemError } from './error-util';
import { backendApiClient } from './backend-api-client';
import {
  User,
  UserRegistration,
} from '../__generated__/linkedup-backend-client';

export const registerUser = async (userRegistration: UserRegistration): Promise<User> => {
  try {
    return await backendApiClient.userMaintenance.createUser(userRegistration);
  } catch (error: any) {
    throw createSystemError(error);
  }
};