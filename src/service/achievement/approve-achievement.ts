import { ApproveAchievement201ResponseDto } from '@api/achievement/achievement-schema';
import {
  approveAchievementApprovalRepo,
  getAchievementApprovalByIdRepo,
} from '@repo/achievement-approval-repo';
import { getActivityByIdRepo } from '@repo/activity-repo';
import { getStudentByIdRepo } from '@repo/student-repo';
import { approvalDetailEntity2Dto } from '@service/achievement/mapper/achievement-mapper';
import { getCreatedUpdatedByService } from '@service/user/shared/enrich-user';

export const approveAchievementService = async (
  jwt: string,
  id: string
): Promise<ApproveAchievement201ResponseDto> => {
  const pendingAchievement = await getAchievementApprovalByIdRepo(jwt, id);
  const result = await approveAchievementApprovalRepo(jwt, id);

  const student = (await getStudentByIdRepo(jwt, result.studentId))!;
  const activity = (await getActivityByIdRepo(jwt, result.activityId))!;
  const simpleUserMap = await getCreatedUpdatedByService(jwt, [
    pendingAchievement!,
  ]);

  return approvalDetailEntity2Dto(
    pendingAchievement!,
    activity,
    student,
    simpleUserMap.get(pendingAchievement!.createdBy),
    simpleUserMap.get(pendingAchievement!.updatedBy),
    undefined
  );
};
