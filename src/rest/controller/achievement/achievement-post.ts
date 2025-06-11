import { Request, Response, NextFunction } from 'express';
import {
  AchievementPost201ResponseDto,
  AchievementPostRequestBodyDto,
} from '../../dto-schema';
import { createAchievement as createAchievementRepo } from '../../../repo/achievement-repo';
import {
  creationDto2Entity,
  entity2Dto,
} from '../../../mapper/achievement-mapper';
import { creationDto2Entity as attachmentCreationDto2Entity } from '../../../mapper/achievement-approval-attachment-mapper';
import { Activity, Student } from '../../../__generated__/linkedup-backend-client';
import { getActivityByIdRepo } from '../../../repo/activity-repo';
import { getStudentByIdRepo } from '../../../repo/student-repo';

export const createAchievement = async (
  req: Request<{}, {}, AchievementPostRequestBodyDto, {}>,
  res: Response<AchievementPost201ResponseDto>,
  next: NextFunction
) => {
    const jwt = res.locals.jwt;

    try {
    const { attachment, ...rest } = req.body;
    const payload = creationDto2Entity(rest);
    const newAchievement = await createAchievementRepo(
      jwt,
      payload,
      attachment.map((atch) => attachmentCreationDto2Entity(atch))
    );

    const student = (await getStudentById(jwt, payload.studentId))!;
    const activity = (await getActivityById(jwt, payload.activityId))!;
    
    const achievementDto = entity2Dto(newAchievement, activity, student);
    // Ensure the attachment property is included in the response
    res.status(201).json({
      ...achievementDto
    });
  } catch (error: any) {
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