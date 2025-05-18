import { Request, Response, NextFunction } from 'express';
import {
  FindUser200ResponseDto,
  FindUserQueryDto,
  SimpleUserDto,
} from '../../dto-schema';
import { dto2Entity as roleDto2Entity } from '../../../mapper/user-role-mapper';
import { dto2Entity as statusDto2Entity } from '../../../mapper/user-status-mapper';
import { entity2Dto } from '../../../mapper/user-mapper';

import { findUser as findUserRepo } from '../../../repo/user-repo';
import { asArray } from '../../../util/array-util';
import { getCreatedUpdatedBy, getStudents } from './user-enrichment';

const systemUser: SimpleUserDto = {
  id: '1',
  email: 'xxx@abc.com',
  name: { English: 'Administrator' },
};

export const findUser = async (
  req: Request<{}, {}, {}, FindUserQueryDto>,
  res: Response<FindUser200ResponseDto>,
  next: NextFunction
) => {
  try {
    const jwt = req.cookies.jwt;
    const email = req.query?.email;
    const name = req.query?.name;
    const studentId = req.query?.studentId;
    const role = asArray(req.query?.role);
    const status = asArray(req.query?.status);

    const result = await findUserRepo(
      {
        email,
        name,
        studentId,
        role: role ? role.map((r) => roleDto2Entity(r)) : undefined,
        status: status ? status.map((s) => statusDto2Entity(s)) : undefined,
      },
      jwt
    );

    const createdUpdatedByMap = await getCreatedUpdatedBy(result);
    const studentMap = await getStudents(result);
    res.status(200).json(
      result.map((u) =>
        entity2Dto(
          u,
          u.entitledStudentId
            .map((id) => studentMap.get(id))
            .filter((s) => s !== undefined),
          createdUpdatedByMap.get(u.createdBy)!,
          createdUpdatedByMap.get(u.updatedBy)!
        )
      )
    );
  } catch (error: any) {
    console.log(`findUserRepo error = ${JSON.stringify(error)}`);
    next(error);
  }
};
