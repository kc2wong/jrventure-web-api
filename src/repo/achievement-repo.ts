import {
  createAchievement as createAchievementApi,
  updateAchievement as updateAchievementApi,
  findAchievement as findAchievementApi,
  AchievementCreation,
  Achievement,
  AchievementApproval,
  AchievementSubmissionRole,
  OrderByDirection,
  FindAchievementResult,
} from '../__generated__/linkedup-backend-client';
import { dto2Entity as submissionRoleDto2Entity } from '../mapper/achievement-submission-role-mapper';
import { callRepo } from './repo-util';

type FindAchievementParams = {
  studentId?: string;
  activityId?: string;
  createDateFrom?: Date;
  role?: AchievementSubmissionRole;
  offset: number;
  limit: number;
  orderByDirection: OrderByDirection;
};

export const findAchievementRepo = async (
  args: FindAchievementParams,
  authorizationToken?: string
): Promise<FindAchievementResult> => {
  const { createDateFrom, role, ...rest } = args;
  const query = {
    ...rest,
    createDateFrom: createDateFrom ? createDateFrom.toISOString() : undefined,
    role: role ? submissionRoleDto2Entity(role) : undefined,
  };
  return await callRepo(
    () => findAchievementApi({ query }),
    authorizationToken
  );
};

export const createAchievement = async (
  payload: AchievementCreation,
  authorizationToken?: string
): Promise<Achievement | AchievementApproval> => {
  return await callRepo(
    () =>
      createAchievementApi({
        body: payload,
      }),
    authorizationToken
  );
};

export const updateAchievement = async (
  id: string,
  version: number,
  payload: AchievementCreation,
  authorizationToken?: string
): Promise<Achievement> => {
  return await callRepo(
    () =>
      updateAchievementApi({
        path: { id },
        body: { ...payload, version },
      }),
    authorizationToken
  );
};
