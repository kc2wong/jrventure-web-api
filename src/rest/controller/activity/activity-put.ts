import { Request, Response, NextFunction } from 'express';
import {
  ActivityPutRequestBodyDto,
  ActivityPutRequestPathDto,
  ActivityPut200ResponseDto,
} from '../../dto-schema';
import { updateActivity as updateActivityRepo } from '../../../repo/activity-repo';
import { entity2DetailDto, payloadDto2Entity } from '../../../mapper/activity-mapper';
import { getCreatedUpdatedBy } from '../user-enrichment';

export const updateActivity = async (
  req: Request<ActivityPutRequestPathDto, {}, ActivityPutRequestBodyDto, {}>,
  res: Response<ActivityPut200ResponseDto>,
  next: NextFunction
) => {
  try {
    const jwt = res.locals.jwt;
    const { version, ...rest } = req.body;
    const payload = payloadDto2Entity(rest);

    const updatedActivity = await updateActivityRepo(
      req.params.id,
      version,
      payload,
      jwt
    );
    const createdUpdatedByMap = await getCreatedUpdatedBy(jwt, [updatedActivity]);

    const activityDto = entity2DetailDto(
      updatedActivity,
      createdUpdatedByMap.get(updatedActivity.createdBy)!,
      createdUpdatedByMap.get(updatedActivity.updatedBy)!
    );
    res.status(200).json(activityDto);
  } catch (error: any) {
    next(error);
  }
};
