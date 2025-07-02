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
  type: 'Web' | 'Android' | 'iOS',
  token: string
): Promise<AuthenticationResponse> => {
  return await callRepo((headers) =>
    authenticateGoogleUser({
      headers,
      body: { type, token },
    })
  );
};
