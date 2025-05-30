import { Request, Response, NextFunction } from 'express';
import {
  UserAuthenticationPostRequestDto,
  UserAuthenticationPost200ResponseDto,
  SimpleUserDto,
} from '../../dto-schema';
import { authenticateUser } from '../../../repo/user-authentication-repo';
import { generateAuthResponse } from './base-authentication-controller';
import { findUser as findUserRepo } from '../../../repo/user-repo';

export const userAuthenticationPost = async (
  req: Request<{}, {}, UserAuthenticationPostRequestDto, {}>,
  res: Response<UserAuthenticationPost200ResponseDto>,
  next: NextFunction
) => {
  try {
    const result = await authenticateUser(req.body.email, req.body.password);
    const { token, menu } = await generateAuthResponse(result.user);
    const parentUser: SimpleUserDto[] =
      result.user.role === 'Student'
        ? (
            await findUserRepo(
              { studentId: result.user.entitledStudentId[0] },
              token
            )
          )
            .filter((u) => u.role === 'Parent')
            .map(({ id, email, name }) => ({ id, email, name }))
        : [];
    res.cookie('jwt', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json(
      result.status === 'Success'
        ? { token, menu, parentUser: parentUser }
        : {
            token,
            menu: { id: '', label: '', children: undefined },
            parentUser: [],
          }
    );
  } catch (error: any) {
    console.log(`error = ${JSON.stringify(error)}`);
    next(error);
  }
};
