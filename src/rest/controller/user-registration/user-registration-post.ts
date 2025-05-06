import { Request, Response, NextFunction } from 'express';
import {
  SimpleUserDto,
  UserRegisterationPostRequestDto,
  UserRegistrationPost201ResponseDto,
} from '../../dto-schema';

import { registerUser as registerUserRepo } from '../../../repo/user-registration-repo';
import { findStudent as findStudentRepo } from '../../../repo/student-repo';
import { entity2Dto } from '../../../mapper/user-mapper';
import { getStudents } from '../user/user-enrichment';

const systemUser: SimpleUserDto = {
  id: '1',
  name: { English: 'Administrator' },
};

export const registerUser = async (
  req: Request<{}, {}, UserRegisterationPostRequestDto, {}>,
  res: Response<UserRegistrationPost201ResponseDto>,
  next: NextFunction
) => {
  try {
    const { studentId, studentName, accessToken } = req.body;
    const newUser = await registerUserRepo({
      accessToken,
      studentId,
      studentName,
    });

    const studentMap = await getStudents([newUser]);

    const userDto = entity2Dto(
      newUser,
      Array.from(studentMap.values()),
      systemUser,
      systemUser
    );
    res.status(200).json(userDto);
  } catch (error: any) {
    next(error);
  }
};
