import { Request, Response, NextFunction } from 'express';
import {
  AchievementGetByStudentActivityId200ResponseDto,
  AchievementGetByStudentActivityIdPathDto,
  AchievementDto,
} from '../../dto-schema';
import {
  AchievementSubmissionRole,
  OrderByDirection,
} from '../../../__generated__/linkedup-backend-client';
import { findAchievementApprovalRepo } from '../../../repo/achievement-approval-repo';
import { findAchievementRepo, getAchievementApprovalByIdRepo } from '../../../repo/achievement-repo';
import { approvalDetailEntity2Dto, entity2Dto } from '../../../mapper/achievement-mapper';
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
    const withApprovalRight = res.locals.authenticatedUser?.withApprovalRight === true;

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

    const newAchievementDto: AchievementDto = {
      id: '-1',
      studentId: studentId,
      activityId: activityId,
      submissionRole: role === 'Teacher' ? 'Teacher' : 'Student',
      comment: '',
      status: 'New',
      attachment: []
    };

    // Return pending record first if user does not have approval right.
    // If user has approval right, then search from approved record
    const studentAchievementApproval = withApprovalRight ? [] : (
      await findAchievementApprovalRepo(queryParam, res.locals.jwt)
    ).data;
    const achievementApproval =
      studentAchievementApproval.length === 1
        ? studentAchievementApproval[0]
        : undefined;

    if (achievementApproval) {
      const achievementApprovalDetail = await getAchievementApprovalByIdRepo(achievementApproval.id, jwt);
      const simpleUserMap = await getCreatedUpdatedBy(jwt, achievementApprovalDetail.review ?? []);
      const achievementApprovalDto = approvalDetailEntity2Dto(achievementApprovalDetail, simpleUserMap);

      res.status(200).json(achievementApprovalDto);
      return;
    }

    const studentAchievement = (
      await findAchievementRepo(queryParam, res.locals.jwt)
    ).data;
    const achievementDto =
      studentAchievement.length === 1
        ? entity2Dto(studentAchievement[0])
        : undefined;

    res.status(200).json(achievementDto ?? newAchievementDto);
  } catch (error: any) {
    console.log(
      `findAchievementByStudentActivityId error = ${JSON.stringify(error)}`
    );
    next(error);
  }
};
