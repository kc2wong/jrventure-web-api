import {
  authenticateUser,
  authenticateGoogleUser,
  AuthenticationResponse,
} from '@processapi/index';
import { callRepo } from './repo-util';

export const authenticateUserRepo = async (
  email: string,
  password: string
): Promise<AuthenticationResponse> => {
  return await callRepo((headers) =>
    authenticateUser({ headers, body: { email, password } })
  );
};

export const googleAuthenticateRepo = async (
  accessToken: string
): Promise<AuthenticationResponse> => {
  return await callRepo((headers) =>
    authenticateGoogleUser({
      headers,
      body: { accessToken },
    })
  );
};
