import { Request, Response, NextFunction } from 'express';
import {
  CreateUser201ResponseDto,
  CreateUserRequestDto,
  FindUser200ResponseDto,
  FindUserQueryDto,
  GetUserById200ResponseDto,
  GetUserByIdPathDto,
  UpdateUserById200ResponseDto,
  UpdateUserByIdPathDto,
  UpdateUserByIdRequestDto,
} from '@api/user/user-schema';
import { findUserService } from '@service/user/find-user';
import { getUserByIdService } from '@service/user/get-user';
import { updateUserService } from '@service/user/update-user';
import { createUserService } from '@service/user/create-user';

export const findUserApi = async (
  req: Request<{}, {}, {}, FindUserQueryDto>,
  res: Response<FindUser200ResponseDto>,
  next: NextFunction
) => {
  try {
    const jwt = res.locals.jwt;
    const users = await findUserService(jwt, req.query);
    res.status(200).json(users);
  } catch (error: any) {
    next(error);
  }
};

export const createUserApi = async (
  req: Request<{}, {}, CreateUserRequestDto>,
  res: Response<CreateUser201ResponseDto>,
  next: NextFunction
) => {
  try {
    const jwt = res.locals.jwt;
    const user = await createUserService(jwt, req.body);
    res.status(201).json(user);
  } catch (error: any) {
    next(error);
  }
};

export const getUserByIdApi = async (
  req: Request<GetUserByIdPathDto>,
  res: Response<GetUserById200ResponseDto>,
  next: NextFunction
) => {
  try {
    const jwt = res.locals.jwt;
    const user = await getUserByIdService(jwt, req.params.id);
    res.status(200).json(user);
  } catch (error: any) {
    next(error);
  }
};

export const updateUserApi = async (
  req: Request<UpdateUserByIdPathDto, {}, UpdateUserByIdRequestDto>,
  res: Response<UpdateUserById200ResponseDto>,
  next: NextFunction
) => {
  try {
    const jwt = res.locals.jwt;
    const user = await updateUserService(jwt, req.params.id, req.body);
    res.status(200).json(user);
  } catch (error: any) {
    next(error);
  }
};
