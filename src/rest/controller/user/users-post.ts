import { Request, Response, NextFunction } from 'express';
import {
  SimpleUserDto,
  UsersPost201ResponseDto,
  UsersPostRequestDto,
} from '../../dto-schema';
import {
  createUser as createUserRepo,
  updateUser as updatedUserRepo,
  findUser as findUserRepo,
} from '../../../repo/user-repo';
import { entity2Dto } from '../../../mapper/user-mapper';
import { dto2Entity as userRoleDto2Entity } from '../../../mapper/user-role-mapper';
import { dto2Entity as userStatusDto2Entity } from '../../../mapper/user-status-mapper';
import { getStudents } from './user-enrichment';
import { User } from '../../../__generated__/linkedup-backend-client';

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
    const jwt = req.cookies.jwt;
    const { email, name, role, status, entitledStudentId } = req.body;

    let existingParent: User | undefined;
    if (role === 'Parent') {
      existingParent = (
        await findUserRepo(
          {
            email,
            role: [userRoleDto2Entity('Parent')],
          },
          jwt
        )
      )[0];
    }

    const newUser = existingParent
      ? await updatedUserRepo(
          existingParent.id,
          existingParent.version,
          {
            email,
            name,
            role: userRoleDto2Entity(role),
            status: userStatusDto2Entity(status),
            entitledStudentId: [
              ...existingParent.entitledStudentId,
              ...entitledStudentId,
            ],
          },
          jwt
        )
      : await createUserRepo(
          {
            email,
            name,
            role: userRoleDto2Entity(role),
            status: userStatusDto2Entity(status),
            entitledStudentId: entitledStudentId ?? [],
          },
          jwt
        );

    const studentMap = await getStudents([newUser], jwt);

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
