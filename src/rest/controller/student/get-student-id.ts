import { Request, Response, NextFunction } from 'express';
import {
  GetStudentByIdPathDto,
  GetStudentById200ResponseDto,
  NotFoundErrorDto,
} from '../../dto-schema';

import { findStudent as findStudentEntity } from '../../../repo/student-repo';
import { entity2Dto as studentEntity2Dto } from '../../../mapper/student-mapper';
import { safeParseInt } from '../../../util/string-util';
import { Student } from '../../../__generated__/linkedup-backend-client';

export const getStudentById = async (
  req: Request<GetStudentByIdPathDto, {}, {}, {}>,
  res: Response<GetStudentById200ResponseDto>,
  next: NextFunction
) => {
  const jwt = req.cookies.jwt;
  const id = req.params.id;
  let byId: Student | undefined;
  let byIdError: any;
  let byClass: Student | undefined;
  let byClassError: any;

  try {
    byId = await findStudentById(id, jwt);
  } catch (err) {
    byIdError = err;
  }

  try {
    byClass = await findStudentByClassIdStudentNumber(id.toUpperCase(), jwt);
  } catch (err) {
    byClassError = err;
  }

  if (byIdError && byClassError) {
    next(byClassError);
  } else if (byId) {
    res.status(200).json(studentEntity2Dto(byId));
  } else if (byClass) {
    res.status(200).json(studentEntity2Dto(byClass));
  } else {
    const notFoundErrorDto = new NotFoundErrorDto(
      'STUDENT_NOT_FOUND',
      `Student with id [${id}] is not found`,
      [id]
    );
    next(notFoundErrorDto);
  }
};

const findStudentById = async (
  id: string,
  authorizationToken ?: string
): Promise<Student | undefined> => {
  try {
    const result = await findStudentEntity([id], authorizationToken);
    return result.length === 1 ? result[0] : undefined;
  } catch (error: any) {
    throw error;
  }
};

const findStudentByClassIdStudentNumber = async (
  classIdStudentNumber: string,
  authorizationToken ?: string
): Promise<Student | undefined> => {
  try {
    const classId = classIdStudentNumber.substring(0, 2);
    const studentNumber = safeParseInt(
      classIdStudentNumber.substring(2).split('-').pop() ?? ''
    );
    const result = (await findStudentEntity(undefined, classId, undefined, authorizationToken)).filter(
      (s) => s.studentNumber == studentNumber
    );
    return result.length === 1 ? result[0] : undefined;
  } catch (error: any) {
    throw error;
  }
};
