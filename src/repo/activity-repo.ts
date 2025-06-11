import { off } from 'process';
import {
  findActivity as findActivityApi,
  getActivityById as getActivityByIdApi,
  createActivity as createActivityRepo,
  updateActivity as updateActivityRepo,
  Activity,
  ActivityStatus,
  ActivityPayload,
  FindActivityResult,
  OrderByDirection,
  AchievementSubmissionRole,
} from '../__generated__/linkedup-backend-client';
import { dto2Entity as submissionRoleDto2Entity } from '../mapper/achievement-submission-role-mapper';
import { dto2Entity as activityStatusDto2Entity } from '../mapper/activity-status-mapper';
import { callRepo } from './repo-util';

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
  args: FindActivityParams,
  authorizationToken: string
): Promise<FindActivityResult> => {
  const {
    startDateFrom,
    startDateTo,
    endDateFrom,
    endDateTo,
    status,
    role,
    ...rest
  } = args;
  const query = {
    ...rest,
    startDateFrom: startDateFrom ? startDateFrom.toISOString() : undefined,
    startDateTo: startDateTo ? startDateTo.toISOString() : undefined,
    endDateFrom: endDateFrom ? endDateFrom.toISOString() : undefined,
    endDateTo: endDateTo ? endDateTo.toISOString() : undefined,
    role: role ? role.map((r) => submissionRoleDto2Entity(r)) : undefined,
    status: status ? status.map((s) => activityStatusDto2Entity(s)) : undefined,
  };
  return await callRepo(
    (headers) => findActivityApi({ headers, query }),
    authorizationToken
  );
};

export const getActivityByIdRepo = async (
  id: string,
  authorizationToken: string
): Promise<Activity> => {
  return await callRepo(
    (headers) => getActivityByIdApi({ headers, path: { id } }),
    authorizationToken
  );
};

export const createActivity = async (
  payload: ActivityPayload,
  authorizationToken: string
): Promise<Activity> => {
  return await callRepo(
    (headers) => createActivityRepo({ headers, body: payload }),
    authorizationToken
  );
};

export const updateActivity = async (
  activityId: string,
  version: number,
  payload: ActivityPayload,
  authorizationToken: string
): Promise<Activity> => {
  return await callRepo(
    (headers) =>
      updateActivityRepo({
        headers,
        path: { id: activityId },
        body: { ...payload, version },
      }),
    authorizationToken
  );
};
