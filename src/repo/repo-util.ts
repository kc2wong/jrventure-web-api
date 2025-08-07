import { client } from '@processapi/client.gen';

import { createSystemError } from './error-util';

client.setConfig({
  baseURL: process.env.BACKEND_API_URL,
});

export const callRepo = async <T>(
  repoCall: (
    headers?: Record<string, string>
  ) => Promise<{ data?: T; error?: any; status?: number }>,
  authorizationToken?: string
): Promise<T> => {
  const { data, error, status } = authorizationToken
    ? await repoCall({
        Authorization: `Bearer ${authorizationToken}`,
      })
    : await repoCall();
  if (error) {
    throw createSystemError(error, status);
  }
  if (data === undefined) {
    throw new Error('Unexpected: No error, but data is undefined');
  }
  return data;
};

export const callGetByIdRepo = async <T>(
  repoCall: (
    headers?: Record<string, string>
  ) => Promise<{ data?: T; error?: any; status?: number }>,
  authorizationToken?: string
): Promise<T | undefined> => {
  const { data, error, status } = authorizationToken
    ? await repoCall({
        Authorization: `Bearer ${authorizationToken}`,
      })
    : await repoCall();
  if (error) {
    if (status === 404) {
      return undefined;
    }
    throw createSystemError(error, status);
  }
  return data;
};
