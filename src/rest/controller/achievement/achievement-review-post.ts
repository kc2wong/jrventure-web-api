import { Request, Response, NextFunction } from 'express';
import {
  AchievementReviewPostBodyDto,
  AchievementReviewPostPathDto,
  AchievementRewviewPost201ResponseDto,
} from '../../dto-schema';
import { createAchievement as createAchievementRepo } from '../../../repo/achievement-repo';
import {
  approvalDetailEntity2Dto,
  creationDto2Entity,
  entity2Dto,
} from '../../../mapper/achievement-mapper';
import { creationDto2Entity as attachmentCreationDto2Entity } from '../../../mapper/achievement-approval-attachment-mapper';
import {
  Activity,
  Student,
} from '../../../__generated__/linkedup-backend-client';
import { getActivityByIdRepo } from '../../../repo/activity-repo';
import { getStudentByIdRepo } from '../../../repo/student-repo';
import { reviewAchievementApprovalRepo } from '../../../repo/achievement-approval-repo';
import { getCreatedUpdatedBy } from '../user-enrichment';

export const reviewAchievement = async (
  req: Request<
    AchievementReviewPostPathDto,
    {},
    AchievementReviewPostBodyDto,
    {}
  >,
  res: Response<AchievementRewviewPost201ResponseDto>,
  next: NextFunction
) => {
  const jwt = res.locals.jwt;

  try {
    const { comment } = req.body;
    const id = req.params.id;

    const result = await reviewAchievementApprovalRepo(id, comment, jwt);

    const student = (await getStudentById(jwt, result.studentId))!;
    const activity = (await getActivityById(jwt, result.activityId))!;
    const simpleUserMap = await getCreatedUpdatedBy(jwt, [
      ...(result.review ?? []),
      result,
    ]);

    const achievementApprovalDto = approvalDetailEntity2Dto(
      result,
      activity,
      student,
      simpleUserMap
    );

    // Ensure the attachment property is included in the response
    res.status(201).json({
      ...achievementApprovalDto,
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
