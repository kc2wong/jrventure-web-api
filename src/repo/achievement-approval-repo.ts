import {
  findAchievementApproval as findAchievementApprovalApi,
  AchievementSubmissionRole,
  OrderByDirection,
  FindAchievementApprovalResult,
} from '../__generated__/linkedup-backend-client';
import { dto2Entity as submissionRoleDto2Entity } from '../mapper/achievement-submission-role-mapper';
import { callRepo } from './repo-util';

type FindAchievementApprovalParams = {
  studentId?: string;
  activityId?: string;
  createDateFrom?: Date;
  role?: AchievementSubmissionRole;
  offset: number;
  limit: number;
  orderByDirection: OrderByDirection;
};

export const findAchievementApprovalRepo = async (
  args: FindAchievementApprovalParams,
  authorizationToken?: string
): Promise<FindAchievementApprovalResult> => {
  const {
    createDateFrom,
    role,
    ...rest
  } = args;
  const query = {
    ...rest,
    createDateFrom: createDateFrom ? createDateFrom.toISOString() : undefined,
    role: role ? submissionRoleDto2Entity(role) : undefined,
  };
  return await callRepo(() => findAchievementApprovalApi({ query }), authorizationToken);
};

// export const getActivityById = async (
//   id: string,
//   authorizationToken?: string
// ): Promise<Activity> => {
//   return await callRepo(
//     () => getActivityByIdRepo({ path: { id } }),
//     authorizationToken
//   );
// };
