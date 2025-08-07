import {
  GetAchievementById200ResponseDto,
} from '@api/achievement/achievement-schema';
import { AchievementNotFoundErrorDto } from '@api/shared/error-schema';
import {
  getAchievementApprovalByIdRepo,
} from '@repo/achievement-approval-repo';
import {
  getAchievementDetailByIdRepo,
} from '@repo/achievement-repo';
import { getActivityByIdRepo } from '@repo/activity-repo';
import { getStudentByIdRepo } from '@repo/student-repo';
import {
  approvalDetailEntity2Dto,
  detailEntity2Dto,
} from '@service/achievement/mapper/achievement-mapper';
import { getCreatedUpdatedByService } from '@service/user/shared/enrich-user';

export const getAchievementByIdService = async (
  jwt: string,
  id: string
): Promise<GetAchievementById200ResponseDto> => {
  const achievementApprovalDetail = await getAchievementApprovalByIdRepo(
    jwt,
    id,
  );
  const achievementDetail =
    achievementApprovalDetail === undefined
      ? await getAchievementDetailByIdRepo(jwt, id)
      : undefined;

  if (achievementApprovalDetail) {
    const review = achievementApprovalDetail
      ? achievementApprovalDetail.review
      : [];
    const latestReview = review.length > 0 ? review[review.length - 1] : undefined;
    const simpleUserMap = await getCreatedUpdatedByService(jwt, [
      ...(review ?? []),
      achievementApprovalDetail,
    ]);

    const studentId = achievementApprovalDetail.studentId;
    const student = (await getStudentByIdRepo(jwt, studentId))!;

    const activityId = achievementApprovalDetail.activityId;
    const activity = (await getActivityByIdRepo(jwt, activityId))!;

    return approvalDetailEntity2Dto(
      achievementApprovalDetail,
      activity,
      student,
      simpleUserMap.get(achievementApprovalDetail.createdBy),
      simpleUserMap.get(achievementApprovalDetail.updatedBy),
      latestReview ? simpleUserMap.get(latestReview.createdBy) : undefined
    );
  } else if (achievementDetail) {
    const studentId = achievementDetail.studentId;
    const student = (await getStudentByIdRepo(jwt, studentId))!;

    const activityId = achievementDetail.activityId;
    const activity = (await getActivityByIdRepo(jwt, activityId))!;

    return detailEntity2Dto(achievementDetail, activity, student);
  } else {
    throw new AchievementNotFoundErrorDto(id);
  }
};
