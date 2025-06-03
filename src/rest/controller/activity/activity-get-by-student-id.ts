import { Request, Response, NextFunction } from 'express';
import jsonwebtoken from 'jsonwebtoken';
import {
  ActivityGetByStudentId200ResponseDto,
  ActivityGetByStudentIdPathDto,
} from '../../dto-schema';
import { findActivity as findActivityRepo } from '../../../repo/activity-repo';
import { getStudentById as getStudentByIdRepo } from '../../../repo/student-repo';
import { entity2Dto } from '../../../mapper/activity-mapper';
import { findAchievementRepo } from '../../../repo/achievement-repo';
import { findAchievementApprovalRepo } from '../../../repo/achievement-approval-repo';
import { AchievementSubmissionRole, OrderByDirection } from '../../../__generated__/linkedup-backend-client';

export const findActivityByStudentId = async (
  req: Request<ActivityGetByStudentIdPathDto, {}, {}, {}>,
  res: Response<ActivityGetByStudentId200ResponseDto>,
  next: NextFunction
) => {
  try {
    const jwt = res.locals.jwt;
    const studentId = req.params.id;

    const student = await getStudentByIdRepo(studentId, jwt);
    if (student === undefined) {
      console.log(`Student with ID ${studentId} not found`);
      res.status(200).json([]);
      return;
    }

    const gradeNumber = parseInt(student.classId.replace(/[A-Za-z]/g, ''), 10);
    const role = res.locals.authenticatedUser?.role;

    if (role !== 'Teacher' && role !== 'Student' && role !== 'Parent') {
      console.log(`Should have no activity for submission by role ${role}`);
      res.status(200).json([]);
      return;
    }

    const { data } = await findActivityRepo(
      {
        participantGrade: [gradeNumber],
        role:
          role === 'Teacher'
            ? ['Both', 'Teacher']
            : role === 'Parent' || role === 'Student'
            ? ['Both', 'Student']
            : [],
        offset: 0,
        limit: 50,
        orderByField: 'StartDate',
        orderByDirection: 'Ascending',
      },
      jwt
    );

    const minCreatedAt = data.reduce(
      (min, item) => Math.min(min, new Date(item.createdAt).getTime()),
      Infinity
    );

    const queryParam = {
        studentId,
        createDateFrom: new Date(minCreatedAt),
        role: (role === 'Teacher' ? 'Teacher' : 'Student') as AchievementSubmissionRole,
        offset: 0,
        limit: data.length,
        orderByDirection: 'Ascending' as OrderByDirection,
    }
    const [studentAchievement, studentAchievementApproval] = await Promise.all([
      findAchievementRepo(queryParam, jwt).then((res) => res.data),
      findAchievementApprovalRepo(queryParam, jwt).then((res) => res.data),
    ]);

    const achievementStatusMap = new Map(
      studentAchievement.map((ac) => [ac.activityId, ac.status])
    );

    const achievementApprovalStatusMap = new Map(
      studentAchievementApproval.map((ac) => [ac.activityId, ac.status])
    );

    res.status(200).json(
      data.map((act, index) => ({
        activity: entity2Dto(act),
        achievementStatus:
          achievementStatusMap.get(act.id) ??
          achievementApprovalStatusMap.get(act.id),
      }))
    );
  } catch (error: any) {
    console.log(`findActivityByStudentId error = ${JSON.stringify(error)}`);
    next(error);
  }
};
