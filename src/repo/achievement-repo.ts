import {
  Achievement,
  AchievementApproval,
  AchievementAttachmentCreation,
  AchievementCreation,
  AchievementDetail,
  AchievementSubmissionRole,
  FindAchievementResult,
  OrderByDirection,
} from '@processapi/types.gen';
import { callGetByIdRepo, callRepo } from './repo-util';
import {
  createAchievement,
  findAchievement,
  getAchievementById,
} from '@processapi/sdk.gen';

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
  authorizationToken: string,
  args: FindAchievementParams
): Promise<FindAchievementResult> => {
  const { createDateFrom, ...rest } = args;
  const query = {
    ...rest,
    createDateFrom: createDateFrom ? createDateFrom.toISOString() : undefined,
  };
  return await callRepo(
    (headers) =>
      findAchievement({
        headers,
        query,
      }),
    authorizationToken
  );
};

export const getAchievementDetailByIdRepo = async (
  authorizationToken: string,
  id: string,
  returnUndefinedOnNotFound: boolean = true
): Promise<AchievementDetail | undefined> => {
  return returnUndefinedOnNotFound
    ? await callGetByIdRepo(
        (headers) => getAchievementById({ headers, path: { id } }),
        authorizationToken
      )
    : await callRepo(
        (headers) => getAchievementById({ headers, path: { id } }),
        authorizationToken
      );
};

export const createAchievementRepo = async (
  authorizationToken: string,
  payload: AchievementCreation,
  attachment: AchievementAttachmentCreation[]
): Promise<Achievement | AchievementApproval> => {
  return await callRepo(
    (headers) =>
      createAchievement({ headers, body: { ...payload, attachment } }),
    authorizationToken
  );
};
