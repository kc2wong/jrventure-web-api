import { Request, Response, NextFunction } from 'express';
import {
  GoogleAuthentication200ResponseDto,
  GoogleAuthenticationRequestDto,
} from '@api/authentication/authentication-schema';
import { googleAuthenticationService } from '@service/authentication/google-authentication';

export const googleAuthenticationApi = async (
  req: Request<{}, {}, GoogleAuthenticationRequestDto>,
  res: Response<GoogleAuthentication200ResponseDto>,
  next: NextFunction
) => {
  try {
    const result = await googleAuthenticationService(req.body.accessToken);
    res.cookie('jwt', result.token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json(result);
  } catch (error: any) {
    console.log(`error = ${JSON.stringify(error)}`);
    next(error);
  }
};
