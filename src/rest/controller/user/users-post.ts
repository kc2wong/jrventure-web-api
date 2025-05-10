import { Request, Response, NextFunction } from 'express';
import {
  SimpleUserDto,
  UsersPost201ResponseDto,
  UsersPostRequestDto,
} from '../../dto-schema';

import { createUser as createUserRepo } from '../../../repo/user-repo';
import { entity2Dto } from '../../../mapper/user-mapper';
import { dto2Entity as userRoleDto2Entity } from '../../../mapper/user-role-mapper';
import { dto2Entity as userStatusDto2Entity } from '../../../mapper/user-status-mapper';
import { getStudents } from './user-enrichment';

const systemUser: SimpleUserDto = {
  id: '1',
  email: 'xxx@abc.com',
  name: { English: 'Administrator' },
};

export const createUser = async (
  req: Request<{}, {}, UsersPostRequestDto, {}>,
  res: Response<UsersPost201ResponseDto>,
  next: NextFunction
) => {
  try {
    const { email, name, role, status, entitledStudentId } = req.body;
    const newUser = await createUserRepo({
      email,
      name,
      role: userRoleDto2Entity(role),
      status: userStatusDto2Entity(status),
      entitledStudentId: entitledStudentId ?? [],
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
