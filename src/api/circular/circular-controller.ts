import { Request, Response, NextFunction } from 'express';

import { createCircularService } from '@service/circular/create-circular';
import { findCircularService } from '@service/circular/find-circular';
import { getCircularByIdService } from '@service/circular/get-circular';
import { updateCircularService } from '@service/circular/update-circular';

import {
  FindCircularQueryDto,
  FindCircular200ResponseDto,
  GetCircularById200ResponseDto,
  GetCircularByIdPathDto,
  CreateCircular201ResponseDto,
  CreateCircularRequestDto,
  UpdateCircularById200ResponseDto,
  UpdateCircularByIdPathDto,
  UpdateCircularByIdRequestDto,
} from './circular-schema';

export const findCircularApi = async (
  req: Request<{}, {}, {}, FindCircularQueryDto>,
  res: Response<FindCircular200ResponseDto>,
  next: NextFunction
) => {
  try {
    const jwt = res.locals.jwt;
    const result = await findCircularService(jwt, req.query);
    res.status(201).json(result);
  } catch (error: any) {
    next(error);
  }
};

export const createCircularApi = async (
  req: Request<{}, {}, CreateCircularRequestDto>,
  res: Response<CreateCircular201ResponseDto>,
  next: NextFunction
) => {
  try {
    const jwt = res.locals.jwt;
    const newCircular = await createCircularService(jwt, req.body);
    res.status(201).json(newCircular);
  } catch (error: any) {
    next(error);
  }
};

export const getCircularApi = async (
  req: Request<GetCircularByIdPathDto>,
  res: Response<GetCircularById200ResponseDto>,
  next: NextFunction
) => {
  try {
    const jwt = res.locals.jwt;
    const activity = await getCircularByIdService(jwt, req.params.id);
    res.status(200).json(activity);
  } catch (error: any) {
    next(error);
  }
};

export const updateCircularApi = async (
  req: Request<UpdateCircularByIdPathDto, {}, UpdateCircularByIdRequestDto>,
  res: Response<UpdateCircularById200ResponseDto>,
  next: NextFunction
) => {
  try {
    const jwt = res.locals.jwt;
    const updatedCircular = await updateCircularService(
      jwt,
      req.params.id,
      req.body
    );
    res.status(200).json(updatedCircular);
  } catch (error: any) {
    next(error);
  }
};
