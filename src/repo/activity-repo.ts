import {
  createActivity,
  findActivity,
  getActivityById,
  updateActivity,
} from '@processapi/sdk.gen';
import {
  Activity,
  ActivityStatus,
  ActivityPayload,
  FindActivityResult,
  OrderByDirection,
  AchievementSubmissionRole,
} from '@processapi/types.gen';

import { callGetByIdRepo, callRepo } from './repo-util';

type FindActivityParams = {
  id?: string[];
  categoryCode?: string[];
  name?: string;
  startDateFrom?: Date;
  startDateTo?: Date;
  endDateFrom?: Date;
  endDateTo?: Date;
  participantGrade?: number[];
  role?: AchievementSubmissionRole[];
  status?: ActivityStatus[];
  offset: number;
  limit: number;
  orderByField: 'Name' | 'StartDate' | 'EndDate';
  orderByDirection: OrderByDirection;
};

export const findActivityRepo = async (
  authorizationToken: string,
  args: FindActivityParams
): Promise<FindActivityResult> => {
  const { startDateFrom, startDateTo, endDateFrom, endDateTo, ...rest } = args;
  const query = {
    ...rest,
    startDateFrom: startDateFrom ? startDateFrom.toISOString() : undefined,
    startDateTo: startDateTo ? startDateTo.toISOString() : undefined,
    endDateFrom: endDateFrom ? endDateFrom.toISOString() : undefined,
    endDateTo: endDateTo ? endDateTo.toISOString() : undefined,
  };
  return await callRepo(
    (headers) => findActivity({ headers, query }),
    authorizationToken
  );
};

// Overload signatures
export function getActivityByIdRepo(
  authorizationToken: string,
  id: string,
  returnUndefinedOnNotFound: false
): Promise<Activity>;

export function getActivityByIdRepo(
  authorizationToken: string,
  id: string,
  returnUndefinedOnNotFound?: true
): Promise<Activity | undefined>;

// Implementation
export async function getActivityByIdRepo(
  authorizationToken: string,
  id: string,
  returnUndefinedOnNotFound: boolean = true
): Promise<Activity | undefined> {
  return returnUndefinedOnNotFound
    ? await callGetByIdRepo(
        (headers) => getActivityById({ headers, path: { id } }),
        authorizationToken
      )
    : await callRepo(
        (headers) => getActivityById({ headers, path: { id } }),
        authorizationToken
      );
}

export const createActivityRepo = async (
  authorizationToken: string,
  payload: ActivityPayload
): Promise<Activity> => {
  return await callRepo(
    (headers) => createActivity({ headers, body: payload }),
    authorizationToken
  );
};

export const updateActivityRepo = async (
  authorizationToken: string,
  activityId: string,
  version: number,
  payload: ActivityPayload
): Promise<Activity> => {
  return await callRepo(
    (headers) =>
      updateActivity({
        headers,
        path: { id: activityId },
        body: { ...payload, version },
      }),
    authorizationToken
  );
};
