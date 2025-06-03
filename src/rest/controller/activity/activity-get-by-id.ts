import { Request, Response, NextFunction } from 'express';
import {
  ActivityGetById200ResponseDto,
  ActivityGetByIdPathDto,
} from '../../dto-schema';
import {
  getActivityById as getActivityByIdRepo,
} from '../../../repo/activity-repo';
import { entity2DetailDto } from '../../../mapper/activity-mapper';
import { getCreatedUpdatedBy } from '../user-enrichment';

export const getActivityById = async (
  req: Request<ActivityGetByIdPathDto, {}, {}, {}>,
  res: Response<ActivityGetById200ResponseDto>,
  next: NextFunction
) => {
  try {
    const jwt = res.locals.jwt;

    const activity = await getActivityByIdRepo(req.params.id, jwt);
    const createdUpdatedByMap = await getCreatedUpdatedBy(jwt, [activity]);

res
  .status(200)
  .json(
    entity2DetailDto(
      activity,
      createdUpdatedByMap.get(activity.createdBy)!,
      createdUpdatedByMap.get(activity.updatedBy)!
    )
  );
  } catch (error: any) {
    console.log(`getActivityById error = ${JSON.stringify(error)}`);
    next(error);
  }
};
