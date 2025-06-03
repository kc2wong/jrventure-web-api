import {
  createAchievement as createAchievementApi,
  updateAchievement as updateAchievementApi,
  findAchievement as findAchievementApi,
  getAchievementApprovalById as getAchievementApprovalByIdApi,
  AchievementCreation,
  Achievement,
  AchievementApproval,
  AchievementSubmissionRole,
  OrderByDirection,
  FindAchievementResult,
  AchievementApprovalDetail,
  AchievementAttachmentCreation,
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

export const getAchievementApprovalByIdRepo = async (
  id: string,
  authorizationToken: string
): Promise<AchievementApprovalDetail> => {
  return await callRepo(
    (headers) => getAchievementApprovalByIdApi({ headers, path: { id } }),
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
