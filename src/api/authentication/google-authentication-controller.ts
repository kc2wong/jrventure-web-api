import { Request, Response, NextFunction } from 'express';

import {
  GoogleAuthentication200ResponseDto,
  GoogleAuthenticationRequestDto,
} from '@api/authentication/authentication-schema';
import { googleAuthenticationService } from '@service/authentication/google-authentication';
import { logger } from '@util/logging-util';

export const googleAuthenticationApi = async (
  req: Request<{}, {}, GoogleAuthenticationRequestDto>,
  res: Response<GoogleAuthentication200ResponseDto>,
  next: NextFunction
) => {
  try {
  const isProduction = process.env.ENV === 'production';
    const result = await googleAuthenticationService(req.body);
    res.cookie('jwt', result.token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'none' : undefined,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json(result);
  } catch (error: any) {
    logger.error(`error = ${JSON.stringify(error)}`);
    next(error);
  }
};
