import { Request, Response, NextFunction } from 'express';
import {
  ActivityGet200ResponseDto,
  ActivityGetQueryDto,
} from '../../dto-schema';
import { findActivity as findActivityRepo } from '../../../repo/activity-repo';
import { entity2DetailDto } from '../../../mapper/activity-mapper';
import { getCreatedUpdatedBy } from '../user-enrichment';

export const findActivity = async (
  req: Request<{}, {}, {}, ActivityGetQueryDto>,
  res: Response<ActivityGet200ResponseDto>,
  next: NextFunction
) => {
  try {
    const jwt = req.cookies.jwt;
    const categoryCode = req.query?.categoryCode;
    const name = req.query?.name;
    const startDateFrom = req.query?.startDateFrom;
    const startDateTo = req.query?.startDateTo;
    const endDateFrom = req.query?.endDateFrom;
    const endDateTo = req.query?.endDateTo;
    const status = req.query?.status;
    const participantGrade = req.query?.participantGrade;

    const result = await findActivityRepo(
      {
        categoryCode,
        name,
        status,
        participantGrade,
        startDateFrom: startDateFrom ? new Date(startDateFrom) : undefined,
        startDateTo: startDateTo ? new Date(startDateTo) : undefined,
        endDateFrom: endDateFrom ? new Date(endDateFrom) : undefined,
        endDateTo: endDateTo ? new Date(endDateTo) : undefined,
      },
      jwt
    );
    const createdUpdatedByMap = await getCreatedUpdatedBy(result);

    res
      .status(200)
      .json(
        result.map((u) =>
          entity2DetailDto(
            u,
            createdUpdatedByMap.get(u.createdBy)!,
            createdUpdatedByMap.get(u.updatedBy)!
          )
        )
      );
  } catch (error: any) {
    console.log(`findActivityRepo error = ${JSON.stringify(error)}`);
    next(error);
  }
};
