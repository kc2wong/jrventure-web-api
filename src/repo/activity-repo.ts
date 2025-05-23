import {
  findActivity as findActivityRepo,
  getActivityById as getActivityByIdRepo,
  Activity,
  ActivityStatus,
} from '../__generated__/linkedup-backend-client';
import { dto2Entity as activityStatusDto2Entity } from '../mapper/activity-status-mapper';
import { callRepo } from './repo-util';

type FindActivityParams = {
  categoryCode?: string[];
  name?: string,
  startDateFrom?: Date;
  startDateTo?: Date;
  endDateFrom?: Date;
  endDateTo?: Date;
  participantGrade?: number[];
  status?: ActivityStatus[]; // classId and studentNumber
};

export const findActivity = async (
  args: FindActivityParams,
  authorizationToken?: string
): Promise<Activity[]> => {
  const {
    startDateFrom,
    startDateTo,
    endDateFrom,
    endDateTo,
    status,
    ...rest
  } = args;
  const query = {
    ...rest,
    startDateFrom: startDateFrom ? startDateFrom.toISOString() : undefined,
    startDateTo: startDateTo ? startDateTo.toISOString() : undefined,
    endDateFrom: endDateFrom ? endDateFrom.toISOString() : undefined,
    endDateTo: endDateTo ? endDateTo.toISOString() : undefined,
    status: status ? status.map((s) => activityStatusDto2Entity(s)) : undefined,
  };
  return await callRepo(() => findActivityRepo({ query }), authorizationToken);
};

export const getActivityById = async (
  id: string,
  authorizationToken?: string
): Promise<Activity> => {
  return await callRepo(
    () => getActivityByIdRepo({ path: { id } }),
    authorizationToken
  );
};
