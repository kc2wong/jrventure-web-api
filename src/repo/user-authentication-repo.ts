import { Client } from '@hey-api/client-axios';
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
  return await callRepo(() =>
    authenticateUserRepo({
      body: { email, password },
    })
  );
};

export const googleAuthenticate = async (
  accessToken: string
): Promise<AuthenticationResponse> => {
  return await callRepo(() =>
    authenticateGoogleUserRepo({
      body: { accessToken },
    })
  );
};
