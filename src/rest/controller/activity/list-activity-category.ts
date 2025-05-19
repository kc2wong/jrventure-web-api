import { Request, Response, NextFunction } from 'express';
import { ActivityCategoryGet200ResponseDto } from '../../dto-schema';
import { listActivityCategory as listActivityCategoryRepo } from '../../../repo/activity-category-repo';
import { entity2Dto } from '../../../mapper/activity-category-mapper';

export const listActivityCategory = async (
  req: Request<{}, {}, {}, {}>,
  res: Response<ActivityCategoryGet200ResponseDto>,
  next: NextFunction
) => {
  try {
    const jwt = req.cookies.jwt;

    const result = await listActivityCategoryRepo(jwt);
    res.status(200).json(result.map((u) => entity2Dto(u)));
  } catch (error: any) {
    console.log(`listActivityCategoryRepo error = ${JSON.stringify(error)}`);
    next(error);
  }
};
