import { Request, Response, NextFunction } from 'express';

import { findClassService } from '@service/class/find-class';

import { FindClassQueryDto, FindClass200ResponseDto } from './class-schema';

export const findClassApi = async (
  req: Request<{}, {}, {}, FindClassQueryDto>,
  res: Response<FindClass200ResponseDto>,
  next: NextFunction
) => {
  try {
    const jwt = res.locals.jwt;
    const classes = await findClassService(jwt, req.query);
    res.status(200).json(classes);
  } catch (error: any) {
    next(error);
  }
};
