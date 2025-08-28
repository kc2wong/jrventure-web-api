import {
  FindClass200ResponseDto,
  FindClassQueryDto,
} from '@api/class/class-schema';
import { findClassRepo } from '@repo/class-repo';
import { entity2Dto as classEntity2Dto } from '@service/class/mapper/class-mapper';

export const findClassService = async (
  jwt: string,
  query: FindClassQueryDto
): Promise<FindClass200ResponseDto> => {
  const grade = query?.grade;
  const classNumber = query?.classNumber;
  const classes = await findClassRepo(jwt, grade, classNumber);
  return classes.map((item) => classEntity2Dto(item));
};
