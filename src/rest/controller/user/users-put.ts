import { Request, Response, NextFunction } from 'express';
import {
  SimpleUserDto,
  UsersPutRequestPathDto,
  UsersPutRequestBodyDto,
  UsersPut200ResponseDto,
} from '../../dto-schema';
import { updateUser as updateUserRepo } from '../../../repo/user-repo';
import { entity2Dto } from '../../../mapper/user-mapper';
import { dto2Entity as userRoleDto2Entity } from '../../../mapper/user-role-mapper';
import { dto2Entity as userStatusDto2Entity } from '../../../mapper/user-status-mapper';
import { getStudents } from './user-enrichment';

const systemUser: SimpleUserDto = {
  id: '1',
  email: 'xxx@abc.com',
  name: { English: 'Administrator' },
};

export const updateUser = async (
  req: Request<UsersPutRequestPathDto, {}, UsersPutRequestBodyDto, {}>,
  res: Response<UsersPut200ResponseDto>,
  next: NextFunction
) => {
  try {
    const jwt = req.cookies.jwt;
    const { email, name, role, status, entitledStudentId, withApprovalRight, version } = req.body;
    const updatedUser = await updateUserRepo(
      req.params.id,
      version,
      {
        email,
        name,
        role: userRoleDto2Entity(role),
        status: userStatusDto2Entity(status),
        entitledStudentId: entitledStudentId ?? [],
        withApprovalRight,
      },
      jwt
    );

    const studentMap = await getStudents([updatedUser], jwt);

    const userDto = entity2Dto(
      updatedUser,
      Array.from(studentMap.values()),
      systemUser,
      systemUser
    );
    res.status(200).json(userDto);
  } catch (error: any) {
    next(error);
  }
};
