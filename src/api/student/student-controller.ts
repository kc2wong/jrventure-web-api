import { Request, Response, NextFunction } from 'express';

import {
  GetAchievementByStudentActivityId200ResponseDto,
  GetAchievementByStudentActivityIdPathDto,
} from '@api/achievement/achievement-schema';
import {
  GetActivityByStudentId200ResponseDto,
  GetActivityByStudentIdPathDto,
} from '@api/activity/activity-schema';
import {
  FindStudentQueryDto,
  FindStudent200ResponseDto,
  GetStudentByIdPathDto,
  GetStudentById200ResponseDto,
} from '@api/student/student-schema';
import { getAchievementByStudentActivityIdService } from '@service/achievement/get-student-achievement';
import { getActivityByStudentIdService } from '@service/activity/get-student-activity';
import { findStudentService } from '@service/student/find-student';
import { getStudentByIdService } from '@service/student/get-student';

export const findStudentApi = async (
  req: Request<{}, {}, {}, FindStudentQueryDto>,
  res: Response<FindStudent200ResponseDto>,
  next: NextFunction
) => {
  try {
    const jwt = res.locals.jwt;
    const students = await findStudentService(jwt, req.query);
    res.status(200).json(students);
  } catch (error: any) {
    next(error);
  }
};

export const getStudentByIdApi = async (
  req: Request<GetStudentByIdPathDto>,
  res: Response<GetStudentById200ResponseDto>,
  next: NextFunction
) => {
  try {
    const jwt = res.locals.jwt;
    const student = await getStudentByIdService(jwt, req.params.id);
    res.status(200).json(student);
  } catch (error: any) {
    next(error);
  }
};

export const getStudentActivityApi = async (
  req: Request<GetActivityByStudentIdPathDto>,
  res: Response<GetActivityByStudentId200ResponseDto>,
  next: NextFunction
) => {
  try {
    const jwt = res.locals.jwt;
    const authenticatedUser = res.locals.authenticatedUser;
    const activity = await getActivityByStudentIdService(
      jwt,
      authenticatedUser,
      req.params.id
    );
    res.status(200).json(activity);
  } catch (error: any) {
    next(error);
  }
};

export const getStudentAchievementByActivityIdApi = async (
  req: Request<GetAchievementByStudentActivityIdPathDto>,
  res: Response<GetAchievementByStudentActivityId200ResponseDto>,
  next: NextFunction
) => {
  try {
    const jwt = res.locals.jwt;
    const authenticatedUser = res.locals.authenticatedUser;
    const achievement = await getAchievementByStudentActivityIdService(
      jwt,
      authenticatedUser,
      req.params.id,
      req.params.activityId
    );
    res.status(200).json(achievement);
  } catch (error: any) {
    next(error);
  }
};
