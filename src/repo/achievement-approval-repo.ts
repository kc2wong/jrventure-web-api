import {
  findAchievementApproval as findAchievementApprovalApi,
  getAchievementApprovalById as getAchievementApprovalByIdApi,
  createAchievementApprovalReview as createAchievementApprovalReviewApi,
  approveAchievementApproval as approveAchievementApprovalApi,
  AchievementSubmissionRole,
  OrderByDirection,
  FindAchievementApprovalResult,
  AchievementApprovalStatus,
  AchievementApprovalDetail,
  AchievementDetail,
} from '../__generated__/linkedup-backend-client';
import { dto2Entity as submissionRoleDto2Entity } from '../mapper/achievement-submission-role-mapper';
import { callRepo } from './repo-util';

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
  const { createDateFrom, role, ...rest } = args;
  const query = {
    ...rest,
    createDateFrom: createDateFrom ? createDateFrom.toISOString() : undefined,
    role: role ? submissionRoleDto2Entity(role) : undefined,
  };
  return await callRepo(
    (headers) => findAchievementApprovalApi({ headers, query }),
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

export const reviewAchievementApprovalRepo = async (
  id: string,
  comment: string,
  authorizationToken: string
): Promise<AchievementApprovalDetail> => {
  return await callRepo(
    (headers) =>
      createAchievementApprovalReviewApi({
        headers,
        path: { id },
        body: { commentType: 'Conversation', comment },
      }),
    authorizationToken
  );
};

export const rejectAchievementApprovalRepo = async (
  id: string,
  comment: string,
  authorizationToken: string
): Promise<AchievementApprovalDetail> => {
  return await callRepo(
    (headers) =>
      createAchievementApprovalReviewApi({
        headers,
        path: { id },
        body: { commentType: 'Rejection', comment },
      }),
    authorizationToken
  );
};

export const approveAchievementApprovalRepo = async (
  id: string,
  authorizationToken: string
): Promise<AchievementDetail> => {
  return await callRepo(
    (headers) =>
      approveAchievementApprovalApi({
        headers,
        path: { id },
      }),
    authorizationToken
  );
};
