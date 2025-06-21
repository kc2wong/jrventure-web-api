import { GetStudentById200ResponseDto } from '@api/student/student-schema';
import { entity2Dto as studentEntity2Dto } from '@service/student/mapper/student-mapper';
import { Student } from '@processapi/types.gen';

import { findStudentRepo, getStudentByIdRepo } from '@repo/student-repo';

import { safeParseInt } from '@util/string-util';
import { StudentNotFoundErrorDto } from '@api/shared/error-schema';

export const getStudentByIdService = async (
  jwt: string,
  id: string
): Promise<GetStudentById200ResponseDto> => {
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
    throw byClassError;
  } else if (byId) {
    return studentEntity2Dto(byId);
  } else if (byClass) {
    return studentEntity2Dto(byClass);
  } else {
    throw new StudentNotFoundErrorDto(id);
  }
};

const findStudentById = async (
  jwt: string,
  id: string
): Promise<Student | undefined> => {
  try {
    return await getStudentByIdRepo(jwt, id);
  } catch (error: any) {
    throw error;
  }
};

const findStudentByClassIdStudentNumber = async (
  jwt: string,
  classIdStudentNumber: string
): Promise<Student | undefined> => {
  try {
    const classId = classIdStudentNumber.substring(0, 2);
    const studentNumber = safeParseInt(
      classIdStudentNumber.substring(2).split('-').pop() ?? ''
    );
    const result = (
      await findStudentRepo(jwt, undefined, classId, undefined)
    ).filter((s) => s.studentNumber == studentNumber);
    return result.length === 1 ? result[0] : undefined;
  } catch (error: any) {
    throw error;
  }
};
