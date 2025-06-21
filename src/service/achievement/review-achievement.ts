import {
  ReviewAchievement201ResponseDto,
} from '@api/achievement/achievement-schema';
import {
  approvalDetailEntity2Dto,
} from '@service/achievement/mapper/achievement-mapper';
import { getStudentByIdRepo } from '@repo/student-repo';
import { getActivityByIdRepo } from '@repo/activity-repo';
import {
  reviewAchievementApprovalRepo,
} from '@repo/achievement-approval-repo';
import { getCreatedUpdatedByService } from '@service/user/shared/enrich-user';

export const reviewAchievementService = async (
  jwt: string,
  id: string,
  comment: string
): Promise<ReviewAchievement201ResponseDto> => {
  const result = await reviewAchievementApprovalRepo(jwt, id, comment);

  const student = (await getStudentByIdRepo(jwt, result.studentId))!;
  const activity = (await getActivityByIdRepo(jwt, result.activityId))!;
  const simpleUserMap = await getCreatedUpdatedByService(jwt, [
    ...(result.review ?? []),
    result,
  ]);

  const latestReview = result.review[result.review.length - 1];
  return approvalDetailEntity2Dto(
    result,
    activity,
    student,
    simpleUserMap.get(result.createdBy),
    simpleUserMap.get(result.updatedBy),
    latestReview ? simpleUserMap.get(latestReview.createdBy) : undefined
  );
};
