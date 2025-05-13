import { Request, Response, NextFunction } from 'express';
import {
  GoogleAuthenticationPostRequestDto,
  GoogleAuthenticationPost200ResponseDto,
  SimpleUserDto,
} from '../../dto-schema';
import {
  AuthenticationStatus,
  UserRole,
} from '../../../__generated__/linkedup-backend-client';
import { googleAuthenticate } from '../../../repo/user-authentication-repo';
import { generateAuthResponse } from './base-authentication-controller';
import { findUser as findUserRepo } from '../../../repo/user-repo';

export const googleAuthenticationPost = async (
  req: Request<{}, {}, GoogleAuthenticationPostRequestDto, {}>,
  res: Response<GoogleAuthenticationPost200ResponseDto>,
  next: NextFunction
) => {
  try {
    const result = await googleAuthenticate(req.body.accessToken);

    if (result.status === AuthenticationStatus.SUCCESS) {
      const { token, menu } = await generateAuthResponse(result.user);
      const parentUser: SimpleUserDto[] =
        result.user.role === UserRole.STUDENT
          ? (await findUserRepo({ studentId: result.user.entitledStudentId[0] }))
              .filter((u) => u.role === UserRole.PARENT)
              .map(({ id, email, name }) => ({ id, email, name }))
          : [];
      res.cookie('jwt', token, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.status(200).json({ token, menu, parentUser });
      return;
    }
  } catch (error: any) {
    console.log(`error = ${JSON.stringify(error)}`);
    next(error);
  }
};
