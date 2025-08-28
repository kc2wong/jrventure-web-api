import {
  createCircular,
  findCircular,
  getCircularById,
  updateCircular,
} from '@processapi/sdk.gen';
import {
  FindCircularResult,
  OrderByDirection,
  Circular,
  CircularPayload,
  CircularStatus,
  CircularDetail,
} from '@processapi/types.gen';

import { callGetByIdRepo, callRepo } from './repo-util';

type FindCircularParams = {
  status?: CircularStatus[];
  title?: string;
  forGrade?: number[];
  dueDateFrom?: Date;
  dueDateTo?: Date;
  offset: number;
  limit: number;
  orderByField: 'Title';
  orderByDirection: OrderByDirection;
};

export const findCircularRepo = async (
  authorizationToken: string,
  args: FindCircularParams
): Promise<FindCircularResult> => {
  const { dueDateFrom, dueDateTo, ...rest } = args;
  const query = {
    ...rest,
    dueDateFrom: dueDateFrom ? dueDateFrom.toISOString() : undefined,
    dueDateTo: dueDateTo ? dueDateTo.toISOString() : undefined,
  };
  return await callRepo(
    (headers) => findCircular({ headers, query }),
    authorizationToken
  );
};

// Overload signatures
export function getCircularByIdRepo(
  authorizationToken: string,
  id: string,
  returnUndefinedOnNotFound: false
): Promise<CircularDetail>;

export function getCircularByIdRepo(
  authorizationToken: string,
  id: string,
  returnUndefinedOnNotFound?: true
): Promise<CircularDetail | undefined>;

// Implementation
export async function getCircularByIdRepo(
  authorizationToken: string,
  id: string,
  returnUndefinedOnNotFound: boolean = true
): Promise<CircularDetail | undefined> {
  return returnUndefinedOnNotFound
    ? await callGetByIdRepo(
        (headers) => getCircularById({ headers, path: { id } }),
        authorizationToken
      )
    : await callRepo(
        (headers) => getCircularById({ headers, path: { id } }),
        authorizationToken
      );
}

export const createCircularRepo = async (
  authorizationToken: string,
  payload: CircularPayload
): Promise<Circular> => {
  return await callRepo(
    (headers) => createCircular({ headers, body: payload }),
    authorizationToken
  );
};

export const updateCircularRepo = async (
  authorizationToken: string,
  circularId: string,
  version: number,
  payload: CircularPayload
): Promise<Circular> => {
  return await callRepo(
    (headers) =>
      updateCircular({
        headers,
        path: { id: circularId },
        body: { ...payload, version },
      }),
    authorizationToken
  );
};
