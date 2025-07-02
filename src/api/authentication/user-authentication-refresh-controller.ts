import { Request, Response, NextFunction } from 'express';
import { userAuthenticationService } from '@service/authentication/user-authentication';
import {
  UserAuthenticationRefreshRequestDto,
  UserAuthenticationRefresh200ResponseDto,
} from '@api/authentication/authentication-schema';

export const userAuthenticationRefreshApi = async (
  req: Request<{}, {}, UserAuthenticationRefreshRequestDto>,
  res: Response<UserAuthenticationRefresh200ResponseDto>,
  next: NextFunction
) => {
  try {
    const jwt = req.body.token;
    const token = jwt.toLowerCase().startsWith('bearer ') ? jwt.slice(7) : jwt; // Remove 'Bearer ' prefix if present
    const result = await userAuthenticationService({
      token: { jwt: token },
    });

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
