import { Student, User } from '@processapi/types.gen';
import { SimpleUserDto, UserDto } from '@api/user/user-schema';
import { entity2Dto as roleEntity2Dto } from '@service/user/mapper/user-role-mapper';
import { entity2Dto as statusEntity2Dto } from '@service/user/mapper/user-status-mapper';
import { entity2Dto as studentEntity2Dto } from '@service/student/mapper/student-mapper';

export const entity2Dto = (
  src: User,
  student: Student[],
  createdBy: SimpleUserDto,
  updatedBy: SimpleUserDto
): UserDto => {
  const { status, role, entitledStudentId, ...others } = src;
  return {
    ...others,
    entitledStudentId: entitledStudentId,
    entitledStudent: student.map((s) => studentEntity2Dto(s)),
    role: roleEntity2Dto(role),
    status: statusEntity2Dto(status),
    createdBy,
    updatedBy,
  };
};
