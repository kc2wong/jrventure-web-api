import { Request, Response, NextFunction } from 'express';
import {
  AchievementApprovalGetQueryDto,
  AchievementApprovalGet200ResponseDto,
} from '../../dto-schema';
import {
  AchievementSubmissionRole,
  AchievementApprovalStatus,
  OrderByDirection,
  Activity,
  Student,
  AchievementApproval,
} from '../../../__generated__/linkedup-backend-client';
import { findAchievementApprovalRepo } from '../../../repo/achievement-approval-repo';
import { entity2Dto } from '../../../mapper/achievement-mapper';
import { findActivityRepo } from '../../../repo/activity-repo';
import { findStudentRepo } from '../../../repo/student-repo';

export const findAchievementApproval = async (
  req: Request<{}, {}, {}, AchievementApprovalGetQueryDto>,
  res: Response<AchievementApprovalGet200ResponseDto>,
  next: NextFunction
) => {
  try {
    const jwt = res.locals.jwt;
    const inOffset = req.query?.offset;
    const inLimit = req.query?.limit;
    const submissionDateOffset = req.query?.submissionDateFrom;
    const role = req.query.role;

    // const activityId = req.params.activityId;
    // const role = res.locals.authenticatedUser?.role;
    // const withApprovalRight = res.locals.authenticatedUser?.withApprovalRight === true;

    const submissionDateOffsetMap = {
      lastSevenDays: -7,
      lastFourteenDays: -14,
      lastThirtyDays: -30,
    };
    submissionDateOffsetMap[submissionDateOffset!];
    const now = new Date();
    const submissionDateFrom = req.query?.submissionDateFrom
      ? now.setTime(
          now.getTime() +
            3600 * 24 * submissionDateOffsetMap[req.query?.submissionDateFrom]
        )
      : undefined;

    const queryParam = {
      offset: inOffset,
      limit: inLimit,
      role: role === 'Both' ? undefined : (role as AchievementSubmissionRole),
      status: 'Pending' as AchievementApprovalStatus,
      submissionDateFrom,
      orderByDirection: 'Ascending' as OrderByDirection,
    };

    const { offset, limit, total, data } = await findAchievementApprovalRepo(
      queryParam,
      jwt
    );

    const activityMap = await findActivities(jwt, data);
    const studentMap = await findStudents(jwt, data);

    res.status(200).json({
      offset: offset ?? inOffset,
      limit: limit ?? inLimit,
      total,
      data: data.map((ach) =>
        entity2Dto(
          ach,
          activityMap.get(ach.activityId)!,
          studentMap.get(ach.studentId)!
        )
      ),
    });
  } catch (error: any) {
    console.log(`findAchievementApproval error = ${JSON.stringify(error)}`);
    next(error);
  }
};

const findActivities = async (
  authorizationToken: string,
  achievement: AchievementApproval[]
): Promise<Map<string, Activity>> => {
  const uniqueActivityIds = [
    ...new Set(achievement.map((act) => act.activityId)),
  ];

  const activities = await findActivityRepo(
    {
      id: uniqueActivityIds,
      offset: 0,
      limit: uniqueActivityIds.length,
      orderByField: 'Name',
      orderByDirection: 'Ascending',
    },
    authorizationToken
  );
  const activityMap = new Map(activities.data.map((act) => [act.id, act]));
  return activityMap;
};

const findStudents = async (
  authorizationToken: string,
  achievement: AchievementApproval[]
): Promise<Map<string, Student>> => {
  const uniqueStudentIds = [
    ...new Set(achievement.map((act) => act.studentId)),
  ];

  const students = await findStudentRepo(authorizationToken, uniqueStudentIds);
  const studentMap = new Map(students.map((student) => [student.id, student]));
  return studentMap;
};
