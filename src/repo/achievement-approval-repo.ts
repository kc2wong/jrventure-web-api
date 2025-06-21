import {
  AchievementSubmissionRole,
  OrderByDirection,
  FindAchievementApprovalResult,
  AchievementApprovalStatus,
  AchievementApprovalDetail,
  AchievementDetail,
} from '@processapi/types.gen';
import { callGetByIdRepo, callRepo } from './repo-util';
import {
  approveAchievementApproval,
  createAchievementApprovalReview,
  findAchievementApproval,
  getAchievementApprovalById,
} from '@processapi/sdk.gen';

type FindAchievementApprovalParams = {
  studentId?: string;
  activityId?: string;
  createDateFrom?: Date;
  role?: AchievementSubmissionRole;
  status?: AchievementApprovalStatus;
  offset: number;
  limit: number;
  orderByDirection: OrderByDirection;
};

export const findAchievementApprovalRepo = async (
  args: FindAchievementApprovalParams,
  authorizationToken: string
): Promise<FindAchievementApprovalResult> => {
  const { createDateFrom, ...rest } = args;
  const query = {
    ...rest,
    createDateFrom: createDateFrom ? createDateFrom.toISOString() : undefined,
  };
  return await callRepo(
    (headers) => findAchievementApproval({ headers, query }),
    authorizationToken
  );
};

export const getAchievementApprovalByIdRepo = async (
  authorizationToken: string,
  id: string,
  returnUndefinedOnNotFound: boolean = true
): Promise<AchievementApprovalDetail | undefined> => {
  return returnUndefinedOnNotFound
    ? await callGetByIdRepo(
        (headers) => getAchievementApprovalById({ headers, path: { id } }),
        authorizationToken
      )
    : await callRepo(
        (headers) => getAchievementApprovalById({ headers, path: { id } }),
        authorizationToken
      );
};

export const reviewAchievementApprovalRepo = async (
  authorizationToken: string,
  id: string,
  comment: string
): Promise<AchievementApprovalDetail> => {
  return await callRepo(
    (headers) =>
      createAchievementApprovalReview({
        headers,
        path: { id },
        body: { commentType: 'Conversation', comment },
      }),
    authorizationToken
  );
};

export const rejectAchievementApprovalRepo = async (
  authorizationToken: string,
  id: string,
  comment: string
): Promise<AchievementApprovalDetail> => {
  return await callRepo(
    (headers) =>
      createAchievementApprovalReview({
        headers,
        path: { id },
        body: { commentType: 'Rejection', comment },
      }),
    authorizationToken
  );
};

export const approveAchievementApprovalRepo = async (
  authorizationToken: string,
  id: string
): Promise<AchievementDetail> => {
  return await callRepo(
    (headers) =>
      approveAchievementApproval({
        headers,
        path: { id },
      }),
    authorizationToken
  );
};
