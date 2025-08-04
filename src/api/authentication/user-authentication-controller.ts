import { Request, Response, NextFunction } from 'express';
import { userAuthenticationService } from '@service/authentication/user-authentication';
import {
  UserAuthenticationRequestDto,
  UserAuthentication200ResponseDto,
} from '@api/authentication/authentication-schema';

export const userAuthenticationApi = async (
  req: Request<{}, {}, UserAuthenticationRequestDto>,
  res: Response<UserAuthentication200ResponseDto>,
  next: NextFunction
) => {
  const isProduction = process.env.ENV === 'production';
  try {
    const { email, password } = req.body;
    const result = await userAuthenticationService({
      credential: { email, password },
    });
    res.cookie('jwt', result.token, {
      httpOnly: true,
      // secure: process.env.ENV === 'production',
      // sameSite: 'none',
      secure: isProduction,
      sameSite: isProduction ? 'none' : undefined,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json(result);
  } catch (error: any) {
    console.log(`error = ${JSON.stringify(error)}`);
    next(error);
  }
};
