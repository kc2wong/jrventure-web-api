import { Request, Response, NextFunction } from 'express';
import { listActivityCategoryService } from '@service/activity-category/list-activity-category';
import { ListActivityCategory200ResponseDto } from '@api/activity-category/activity-category-schema';
import {
  CreateActivity201ResponseDto,
  CreateActivityRequestDto,
  FindActivity200ResponseDto,
  FindActivityQueryDto,
  GetActivityById200ResponseDto,
  GetActivityByIdPathDto,
  UpdateActivityById200ResponseDto,
  UpdateActivityByIdPathDto,
  UpdateActivityByIdRequestDto,
} from '@api/activity/activity-schema';
import { createActivityService } from '@service/activity/create-activity';
import { updateActivityService } from '@service/activity/update-activity';
import { getActivityByIdService } from '@service/activity/get-activity';
import { findActivityService } from '@service/activity/find-activity';

export const findActivityApi = async (
  req: Request<{}, {}, {}, FindActivityQueryDto>,
  res: Response<FindActivity200ResponseDto>,
  next: NextFunction
) => {
  try {
    const jwt = res.locals.jwt;
    const result = await findActivityService(jwt, req.query);
    res.status(201).json(result);
  } catch (error: any) {
    next(error);
  }
};

export const createActivityApi = async (
  req: Request<{}, {}, CreateActivityRequestDto>,
  res: Response<CreateActivity201ResponseDto>,
  next: NextFunction
) => {
  try {
    const jwt = res.locals.jwt;
    const newActivity = await createActivityService(jwt, req.body);
    res.status(201).json(newActivity);
  } catch (error: any) {
    next(error);
  }
};

export const getActivityApi = async (
  req: Request<GetActivityByIdPathDto>,
  res: Response<GetActivityById200ResponseDto>,
  next: NextFunction
) => {
  try {
    const jwt = res.locals.jwt;
    const activity = await getActivityByIdService(jwt, req.params.id);
    res.status(200).json(activity);
  } catch (error: any) {
    next(error);
  }
};

export const updateActivityApi = async (
  req: Request<UpdateActivityByIdPathDto, {}, UpdateActivityByIdRequestDto>,
  res: Response<UpdateActivityById200ResponseDto>,
  next: NextFunction
) => {
  try {
    const jwt = res.locals.jwt;
    const updatedActivity = await updateActivityService(
      jwt,
      req.params.id,
      req.body
    );
    res.status(200).json(updatedActivity);
  } catch (error: any) {
    next(error);
  }
};
