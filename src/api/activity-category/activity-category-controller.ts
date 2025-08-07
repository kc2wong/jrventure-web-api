import { Request, Response, NextFunction } from 'express';

import { ListActivityCategory200ResponseDto } from '@api/activity-category/activity-category-schema';
import { listActivityCategoryService } from '@service/activity-category/list-activity-category';

export const listActivityCategoryApi = async (
  req: Request<{}, {}, {}, {}>,
  res: Response<ListActivityCategory200ResponseDto>,
  next: NextFunction
) => {
  try {
    const jwt = res.locals.jwt;
    const activityCategories = await listActivityCategoryService(jwt);
    res.status(200).json(activityCategories);
  } catch (error: any) {
    next(error);
  }
};
