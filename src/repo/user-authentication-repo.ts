import { AuthenticationResponse } from '../__generated__/linkedup-backend-client/models/AuthenticationResponse';
import { createSystemError } from './error-util';
import { backendApiClient } from './backend-api-client';

export const authenticateUser = async (
  email: string,
  password: string
): Promise<AuthenticationResponse> => {
  try {
    return await backendApiClient.userAuthentication.authenticateUser({
      email,
      password,
    });
  } catch (error: any) {
    throw createSystemError(error);
  }
};

export const googleAuthenticate = async (
  accessToken: string,
): Promise<AuthenticationResponse> => {
  try {
    return await backendApiClient.userAuthentication.authenticateGoogleUser({
      accessToken,
    });
  } catch (error: any) {
    throw createSystemError(error);
  }
};
