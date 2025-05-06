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
import { findStudent as findStudentRepo } from '../../../repo/student-repo';
import { asArray } from '../../../util/array-util';
import { getStudents } from './user-enrichment';

const systemUser: SimpleUserDto = {
  id: '1',
  name: { English: 'Administrator' },
};

export const findUser = async (
  req: Request<{}, {}, {}, FindUserQueryDto>,
  res: Response<FindUser200ResponseDto>,
  next: NextFunction
) => {
  try {
    const email = req.query?.email;
    const name = req.query?.name;
    const studentId = req.query?.studentId;
    const role = asArray(req.query?.role);
    const status = asArray(req.query?.status);

    const result = await findUserRepo(
      undefined,
      email,
      name,
      studentId,
      role ? role.map((r) => roleDto2Entity(r)) : undefined,
      status ? status.map((s) => statusDto2Entity(s)) : undefined
    );

    const studentMap = await getStudents(result);

    res.status(200).json(
      result.map((u) =>
        entity2Dto(
          u,
          u.entitledStudentId
            .map((id) => studentMap.get(id))
            .filter((s) => s !== undefined),
          systemUser,
          systemUser
        )
      )
    );
  } catch (error: any) {
    console.log(`findUserRepo error = ${JSON.stringify(error)}`);
    next(error);
  }
};
