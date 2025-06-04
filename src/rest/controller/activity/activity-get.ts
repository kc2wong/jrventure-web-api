import { Request, Response, NextFunction } from 'express';
import {
  ActivityGet200ResponseDto,
  ActivityGetQueryDto,
} from '../../dto-schema';
import { findActivity as findActivityRepo } from '../../../repo/activity-repo';
import { entity2Dto } from '../../../mapper/activity-mapper';
import { asArray } from '../../../util/array-util';

export const findActivity = async (
  req: Request<{}, {}, {}, ActivityGetQueryDto>,
  res: Response<ActivityGet200ResponseDto>,
  next: NextFunction
) => {
  try {

    const jwt = res.locals.jwt;
    const categoryCode = req.query?.categoryCode;
    const name = req.query?.name;
    const startDateFrom = req.query?.startDateFrom;
    const startDateTo = req.query?.startDateTo;
    const endDateFrom = req.query?.endDateFrom;
    const endDateTo = req.query?.endDateTo;
    const status = req.query?.status;
    const participantGrade = req.query?.participantGrade;
    const inOffset = req.query.offset;
    const inLimit = req.query.limit;
    const orderByField = req.query.orderByField;
    const orderByDirection = req.query.orderByDirection;

    const { offset, limit, total, data } = await findActivityRepo(
      {
        categoryCode: categoryCode ? asArray(categoryCode) : undefined,
        name,
        status: status ? asArray(status) : undefined,
        participantGrade : participantGrade ? asArray(participantGrade) : undefined,
        startDateFrom: startDateFrom ? new Date(startDateFrom) : undefined,
        startDateTo: startDateTo ? new Date(startDateTo) : undefined,
        endDateFrom: endDateFrom ? new Date(endDateFrom) : undefined,
        endDateTo: endDateTo ? new Date(endDateTo) : undefined,
        offset: inOffset,
        limit: inLimit,
        orderByField: orderByField,
        orderByDirection: orderByDirection,
      },
      jwt
    );

    res.status(200).json({
      offset: offset ?? inOffset,
      limit: limit ?? inLimit,
      total,
      data: data.map((act) => entity2Dto(act)),
    });
  } catch (error: any) {
    console.log(`findActivityRepo error = ${JSON.stringify(error)}`);
    next(error);
  }
};
