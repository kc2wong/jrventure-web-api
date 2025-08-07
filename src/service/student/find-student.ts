import {
  FindStudentQueryDto,
  FindStudent200ResponseDto,
} from '@api/student/student-schema';
import { findStudentRepo } from '@repo/student-repo';
import { entity2Dto as studentEntity2Dto } from '@service/student/mapper/student-mapper';
import { asArray } from '@util/array-util';
import { safeParseInt } from '@util/string-util';

export const findStudentService = async (
  jwt: string,
  query: FindStudentQueryDto
): Promise<FindStudent200ResponseDto> => {
  const ids = asArray(query?.id);
  const classIdStudentNumber = query?.classIdStudentNumber;
  const classId = classIdStudentNumber
    ? classIdStudentNumber.substring(0, 2)
    : undefined;
  const studentNumber = classIdStudentNumber
    ? safeParseInt(classIdStudentNumber.substring(2).split('-').pop() ?? '')
    : undefined;
  const name = query?.name;

  const matchedStudents = (
    await findStudentRepo(jwt, ids, classId, name)
  ).filter(
    (s) => studentNumber === undefined || s.studentNumber === studentNumber
  );

  return (matchedStudents ?? [])
    .filter((s) => s !== undefined)
    .map((s) => studentEntity2Dto(s));
};
