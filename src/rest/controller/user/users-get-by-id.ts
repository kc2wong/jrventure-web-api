import { Request, Response, NextFunction } from 'express';
import {
  GetUserById200ResponseDto,
  GetUserByIdPathDto,
  SimpleUserDto,
  NotFoundErrorDto,
} from '../../dto-schema';

import { findUser } from '../../../repo/user-repo';
import { safeParseInt } from '../../../util/string-util';
import { entity2Dto } from '../../../mapper/user-mapper';

const systemUser: SimpleUserDto = {
  id: '1',
  name: { English: 'Administrator' },
};

export const getUserById = async (
  req: Request<GetUserByIdPathDto, {}, {}, {}>,
  res: Response<GetUserById200ResponseDto>,
  next: NextFunction
) => {
  try {
    const idRaw = req.params.id;
    const id = safeParseInt(idRaw);
    const notFoundErrorDto = new NotFoundErrorDto(
      'USER_NOT_FOUND',
      `User with id [${idRaw}] is not found`,
      [idRaw]
    );
    if (id === undefined) {
      throw notFoundErrorDto;
    }

    const users = await findUser([id]);
    if (users.length != 1) {
      throw notFoundErrorDto;
    }

    const userDto = entity2Dto(
      users[0],
      [],
      systemUser,
      systemUser
    );
    res.status(200).json(userDto);
  } catch (error: any) {
    next(error);
  }
};
