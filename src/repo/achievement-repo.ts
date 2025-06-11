import {
  createAchievement as createAchievementApi,
  updateAchievement as updateAchievementApi,
  findAchievement as findAchievementApi,
  getAchievementById as getAchievementDetailByIdApi,
  AchievementCreation,
  Achievement,
  AchievementApproval,
  AchievementSubmissionRole,
  OrderByDirection,
  FindAchievementResult,
  AchievementAttachmentCreation,
  AchievementDetail,
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
  authorizationToken: string
): Promise<FindAchievementResult> => {
  const { createDateFrom, role, ...rest } = args;
  const query = {
    ...rest,
    createDateFrom: createDateFrom ? createDateFrom.toISOString() : undefined,
    role: role ? submissionRoleDto2Entity(role) : undefined,
  };
  return await callRepo(
    (headers) =>
      findAchievementApi({
        headers,
        query,
      }),
    authorizationToken
  );
};

export const getAchievementDetailByIdRepo = async (
  id: string,
  authorizationToken: string
): Promise<AchievementDetail> => {
  return await callRepo(
    (headers) => getAchievementDetailByIdApi({ headers, path: { id } }),
    authorizationToken
  );
};

export const createAchievement = async (
  authorizationToken: string,
  payload: AchievementCreation,
  attachment: AchievementAttachmentCreation[],
): Promise<Achievement | AchievementApproval> => {
  return await callRepo(
    (headers) => createAchievementApi({ headers, body: { ...payload, attachment } }),
    authorizationToken
  );
};

export const updateAchievement = async (
  id: string,
  version: number,
  payload: AchievementCreation,
  authorizationToken: string
): Promise<Achievement> => {
  return await callRepo(
    (headers) =>
      updateAchievementApi({
        headers,
        path: { id },
        body: { ...payload, version },
      }),
    authorizationToken
  );
};
