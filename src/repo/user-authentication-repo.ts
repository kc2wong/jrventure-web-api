import {
  authenticateUser as authenticateUserRepo,
  authenticateGoogleUser as authenticateGoogleUserRepo,
  AuthenticationResponse,
} from '../__generated__/linkedup-backend-client';
import { callRepo } from './repo-util';

export const authenticateUser = async (
  email: string,
  password: string
): Promise<AuthenticationResponse> => {
  return await callRepo(
    (headers) => authenticateUserRepo({ headers, body: { email, password } }),
  );
};

export const googleAuthenticate = async (
  accessToken: string
): Promise<AuthenticationResponse> => {
  return await callRepo(
    (headers) =>
      authenticateGoogleUserRepo({
        headers,
        body: { accessToken },
      }),
  );
};
