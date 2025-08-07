import {
  RejectAchievement201ResponseDto,
} from '@api/achievement/achievement-schema';
import {
  rejectAchievementApprovalRepo,
} from '@repo/achievement-approval-repo';
import { getActivityByIdRepo } from '@repo/activity-repo';
import { getStudentByIdRepo } from '@repo/student-repo';
import {
  approvalDetailEntity2Dto,
} from '@service/achievement/mapper/achievement-mapper';
import { getCreatedUpdatedByService } from '@service/user/shared/enrich-user';

export const rejectAchievementService = async (
  jwt: string,
  id: string,
  comment: string
): Promise<RejectAchievement201ResponseDto> => {
  const result = await rejectAchievementApprovalRepo(jwt, id, comment);

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
