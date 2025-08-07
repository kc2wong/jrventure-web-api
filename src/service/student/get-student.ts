import { StudentNotFoundErrorDto } from '@api/shared/error-schema';
import { GetStudentById200ResponseDto } from '@api/student/student-schema';
import { Student } from '@processapi/types.gen';
import { findStudentRepo, getStudentByIdRepo } from '@repo/student-repo';
import { entity2Dto as studentEntity2Dto } from '@service/student/mapper/student-mapper';
import { logger } from '@util/logging-util';
import { safeParseInt } from '@util/string-util';

export const getStudentByIdService = async (
  jwt: string,
  id: string
): Promise<GetStudentById200ResponseDto> => {
  let byId: Student | undefined;
  let byIdError: any;
  let byClass: Student | undefined;
  let byClassError: any;

  try {
    byId = await findStudentById(jwt, id);
  } catch (err) {
    byIdError = err;
  }

  try {
    byClass = await findStudentByClassIdStudentNumber(jwt, id.toUpperCase());
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
    logger.info(`classId = ${classId}, studentNumber = ${studentNumber}`);
    const result = (
      await findStudentRepo(jwt, undefined, classId, undefined)
    ).filter((s) => s.studentNumber == studentNumber);
    return result.length === 1 ? result[0] : undefined;
  } catch (error: any) {
    throw error;
  }
};
