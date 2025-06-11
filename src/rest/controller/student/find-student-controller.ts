import { Request, Response, NextFunction } from 'express';
import {
  FindStudentQueryDto,
  FindStudent200ResponseDto,
  StudentDto,
} from '../../dto-schema';

import { findStudentRepo as findStudentEntity } from '../../../repo/student-repo';
import { asArray } from '../../../util/array-util';
import { entity2Dto as studentEntity2Dto } from '../../../mapper/student-mapper';
import { safeParseInt } from '../../../util/string-util';

export const findStudent = async (
  req: Request<{}, {}, {}, FindStudentQueryDto>,
  res: Response<FindStudent200ResponseDto>,
  next: NextFunction
) => {
  try {
    const jwt = res.locals.jwt;
    const ids = asArray(req.query?.id);
    const classIdStudentNumber = req.query?.classIdStudentNumber;
    const classId = classIdStudentNumber
      ? classIdStudentNumber.substring(0, 2)
      : undefined;
    const studentNumber = classIdStudentNumber
      ? safeParseInt(classIdStudentNumber.substring(2).split('-').pop() ?? '')
      : undefined;
    const name = req.query?.name;

    const matchedStudents = (
      await findStudentEntity(jwt, ids, classId, name)
    ).filter(
      (s) => studentNumber === undefined || s.studentNumber === studentNumber
    );

    res
      .status(200)
      .json(
        (matchedStudents ?? [])
          .filter((s) => s !== undefined)
          .map((s) => studentEntity2Dto(s))
      );
  } catch (error: any) {
    next(error);
  }
};
