import { GetAchievementByStudentActivityId200ResponseDto } from '@api/achievement/achievement-schema';
import {
  findAchievementRepo,
  getAchievementDetailByIdRepo,
} from '@repo/achievement-repo';
import {
  approvalDetailEntity2Dto,
  detailEntity2Dto,
} from '@service/achievement/mapper/achievement-mapper';
import { getStudentByIdRepo } from '@repo/student-repo';
import {
  AchievementDetail,
  AchievementStatus,
  AchievementSubmissionRole,
  OrderByDirection,
} from '@processapi/types.gen';
import { getActivityByIdRepo } from '@repo/activity-repo';
import {
  findAchievementApprovalRepo,
  getAchievementApprovalByIdRepo,
} from '@repo/achievement-approval-repo';
import { getCreatedUpdatedByService } from '@service/user/shared/enrich-user';
import { AuthenticatedUser } from '@type/authentication';

export const getAchievementByStudentActivityIdService = async (
  jwt: string,
  authenticatedUser: AuthenticatedUser,
  studentId: string,
  activityId: string
): Promise<GetAchievementByStudentActivityId200ResponseDto> => {
  const role = authenticatedUser.userRole;
  const withApprovalRight = authenticatedUser.withApprovalRight === true;

  const queryParam = {
    studentId,
    activityId,
    role: (role === 'Teacher'
      ? 'Teacher'
      : 'Student') as AchievementSubmissionRole,
    offset: 0,
    limit: 1, // should have 0 or 1 record only
    orderByDirection: 'Ascending' as OrderByDirection,
  };

  const newAchievement: AchievementDetail = {
    id: '-1',
    studentId: studentId,
    activityId: activityId,
    submissionRole: role === 'Teacher' ? 'Teacher' : 'Student',
    status: 'Approved', // or another valid AchievementStatus value
    comment: '',
    attachment: [],
    numberOfAttachment: 0,
  };

  // should return 404 if student of activity is not found
  const student = (await getStudentByIdRepo(jwt, studentId))!;
  const activity = (await getActivityByIdRepo(jwt, activityId))!;
  // Return pending record first if user does not have approval right.
  // If user has approval right, then search from approved record
  const studentAchievementApproval = withApprovalRight
    ? []
    : (await findAchievementApprovalRepo(queryParam, jwt)).data;
  const achievementApproval =
    studentAchievementApproval.length === 1
      ? studentAchievementApproval[0]
      : undefined;

  if (achievementApproval) {
    const achievementApprovalDetail = (await getAchievementApprovalByIdRepo(
      jwt,
      achievementApproval.id
    ))!;
    const simpleUserMap = await getCreatedUpdatedByService(jwt, [
      achievementApprovalDetail,
      ...(achievementApprovalDetail.review ?? []),
    ]);
    const latestReview = achievementApprovalDetail.review.pop();
    const achievementApprovalDto = approvalDetailEntity2Dto(
      achievementApprovalDetail,
      activity,
      student,
      simpleUserMap.get(achievementApprovalDetail.createdBy),
      simpleUserMap.get(achievementApprovalDetail.updatedBy),
      latestReview ? simpleUserMap.get(latestReview.createdBy) : undefined
    );

    return achievementApprovalDto;
  }

  const studentAchievement = (await findAchievementRepo(jwt, queryParam)).data;
  const achievement =
    studentAchievement.length === 1 ? studentAchievement[0] : undefined;

  if (achievement) {
    const achievementDetail = (await getAchievementDetailByIdRepo(
      jwt,
      achievement.id,
    ))!;
    const achievementDto = detailEntity2Dto(
      achievementDetail,
      activity,
      student
    );

    return achievementDto;
  }

  return {
    ...detailEntity2Dto(newAchievement, activity, student),
    status: 'New' as AchievementStatus,
  };
};
