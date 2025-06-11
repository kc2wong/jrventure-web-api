import { Request, Response, NextFunction } from 'express';
import {
  AchievementGetByIdPathDto,
  AchievementGetById200ResponseDto,
} from '../../dto-schema';
import {
  Activity,
  Student,
} from '../../../__generated__/linkedup-backend-client';
import {
  getAchievementApprovalByIdRepo,
} from '../../../repo/achievement-approval-repo';
import {
  getAchievementDetailByIdRepo,
} from '../../../repo/achievement-repo';
import { getStudentByIdRepo } from '../../../repo/student-repo';
import { getActivityByIdRepo } from '../../../repo/activity-repo';
import {
  approvalDetailEntity2Dto,
} from '../../../mapper/achievement-mapper';
import { getCreatedUpdatedBy } from '../user-enrichment';

export const getAchievementById = async (
  req: Request<AchievementGetByIdPathDto, {}, {}, {}>,
  res: Response<AchievementGetById200ResponseDto>,
  next: NextFunction
) => {
  try {
    const jwt = res.locals.jwt;
    const id = req.params.id;

    const achievementApprovalDetail = await getAchievementApprovalByIdRepo(
      id,
      jwt
    );
    const achievementDetail = achievementApprovalDetail === undefined ? await getAchievementDetailByIdRepo(
      id,
      jwt
    ) : undefined;

    if (achievementApprovalDetail === undefined && achievementDetail === undefined) {
      // TODO throw not found error
    }

    const review = achievementApprovalDetail ? achievementApprovalDetail.review : [];
    const simpleUserMap = await getCreatedUpdatedBy(
      jwt,
      [...(review ?? []), achievementApprovalDetail],
    );

    const studentId = achievementApprovalDetail ? achievementApprovalDetail.studentId : achievementDetail?.studentId;
    const student = (await getStudentById(
      jwt,
      studentId ?? ''
    ))!;

    const activityId = achievementApprovalDetail ? achievementApprovalDetail.activityId : achievementDetail?.activityId;
    const activity = (await getActivityById(
      jwt,
      activityId ?? ''
    ))!;

    const achievementApprovalDto = approvalDetailEntity2Dto(
      achievementApprovalDetail ?? achievementDetail,
      activity,
      student,
      simpleUserMap
    );

    res.status(200).json(achievementApprovalDto);
    return;
  } catch (error: any) {
    console.log(
      `getAchievementById error = ${JSON.stringify(error)}`
    );
    next(error);
  }
};

const getStudentById = async (
  jwt: string,
  studentId: string
): Promise<Student | undefined> => {
  return await getStudentByIdRepo(studentId, jwt);
};

const getActivityById = async (
  jwt: string,
  activityId: string
): Promise<Activity | undefined> => {
  return await getActivityByIdRepo(activityId, jwt);
};
