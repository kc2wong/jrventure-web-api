import { Request, Response, NextFunction } from 'express';
import {
  AchievementGetByStudentActivityId200ResponseDto,
  AchievementGetByStudentActivityIdPathDto,
  AchievementDto,
} from '../../dto-schema';
import {
  AchievementApproval,
  AchievementApprovalDetail,
  AchievementDetail,
  AchievementStatus,
  AchievementSubmissionRole,
  Activity,
  OrderByDirection,
  Student,
} from '../../../__generated__/linkedup-backend-client';
import { findAchievementApprovalRepo, getAchievementApprovalByIdRepo } from '../../../repo/achievement-approval-repo';
import {
  findAchievementRepo,
  getAchievementDetailByIdRepo,
} from '../../../repo/achievement-repo';
import { getStudentByIdRepo } from '../../../repo/student-repo';
import { getActivityByIdRepo } from '../../../repo/activity-repo';
import {
  approvalDetailEntity2Dto,
  detailEntity2Dto,
  entity2Dto,
} from '../../../mapper/achievement-mapper';
import { getCreatedUpdatedBy } from '../user-enrichment';

export const findAchievementByStudentActivityId = async (
  req: Request<AchievementGetByStudentActivityIdPathDto, {}, {}, {}>,
  res: Response<AchievementGetByStudentActivityId200ResponseDto>,
  next: NextFunction
) => {
  try {
    const jwt = res.locals.jwt;
    const studentId = req.params.id;
    const activityId = req.params.activityId;
    const role = res.locals.authenticatedUser?.role;
    const withApprovalRight =
      res.locals.authenticatedUser?.withApprovalRight === true;

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
    const student = (await getStudentById(jwt, studentId))!;
    const activity = (await getActivityById(jwt, activityId))!;
    // Return pending record first if user does not have approval right.
    // If user has approval right, then search from approved record
    const studentAchievementApproval = withApprovalRight
      ? []
      : (await findAchievementApprovalRepo(queryParam, res.locals.jwt)).data;
    const achievementApproval =
      studentAchievementApproval.length === 1
        ? studentAchievementApproval[0]
        : undefined;

    if (achievementApproval) {
      const achievementApprovalDetail = await getAchievementApprovalByIdRepo(
        achievementApproval.id,
        jwt
      );
      const simpleUserMap = await getCreatedUpdatedBy(
        jwt,
        [achievementApprovalDetail, ...achievementApprovalDetail.review ?? []]
      );
      const achievementApprovalDto = approvalDetailEntity2Dto(
        achievementApprovalDetail,
        activity,
        student,
        simpleUserMap
      );

      res.status(200).json(achievementApprovalDto);
      return;
    }

    const studentAchievement = (
      await findAchievementRepo(queryParam, res.locals.jwt)
    ).data;
    const achievement =
      studentAchievement.length === 1
        ? studentAchievement[0]
        : undefined;

    if (achievement) {
      const achievementDetail = await getAchievementDetailByIdRepo(
        achievement.id,
        jwt
      );
      const achievementDto = detailEntity2Dto(
        achievementDetail,
        activity,
        student,
      );

      res.status(200).json(achievementDto);
      return;
    }

    res.status(200).json({
            ...detailEntity2Dto(newAchievement, activity, student),
            status: 'New' as AchievementStatus,
          });
  } catch (error: any) {
    console.log(
      `findAchievementByStudentActivityId error = ${JSON.stringify(error)}`
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
