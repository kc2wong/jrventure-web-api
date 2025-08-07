import { Request, Response, NextFunction } from 'express';

import {
  RegisterUser201ResponseDto,
  RegisterUserRequestDto,
} from '@api/user/user-schema';
import { registerUserService } from '@service/user/register-user';

export const registerUserApi = async (
  req: Request<{}, {}, RegisterUserRequestDto>,
  res: Response<RegisterUser201ResponseDto>,
  next: NextFunction
) => {
  try {
    const jwt = res.locals.jwt;
    const user = await registerUserService(jwt, req.body);
    res.status(201).json(user);
  } catch (error: any) {
    next(error);
  }
};
