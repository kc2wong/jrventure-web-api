import { Request, Response, NextFunction } from 'express';
import { ActivityPostRequestBodyDto } from '../../dto-schema';
import { createActivity as createActivityRepo } from '../../../repo/activity-repo';
import {
  payloadDto2Entity,
  entity2DetailDto,
} from '../../../mapper/activity-mapper';
import { getCreatedUpdatedBy } from '../user-enrichment';

export const createActivity = async (
  req: Request<{}, {}, ActivityPostRequestBodyDto, {}>,
  res: Response<ReturnType<typeof entity2DetailDto>>,
  next: NextFunction
) => {
  try {
    const jwt = req.cookies.jwt;
    const payload = payloadDto2Entity(req.body);

    const newActivity = await createActivityRepo(payload, jwt);
    const createdUpdatedByMap = await getCreatedUpdatedBy([newActivity]);

    const activityDto = entity2DetailDto(
      newActivity,
      createdUpdatedByMap.get(newActivity.createdBy)!,
      createdUpdatedByMap.get(newActivity.updatedBy)!
    );
    res.status(201).json(activityDto);
  } catch (error: any) {
    next(error);
  }
};
