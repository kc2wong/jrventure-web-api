import {
  Student,
  User as UserEntity,
} from '../__generated__/linkedup-backend-client';
import { SimpleUserDto, UserDto } from '../rest/dto-schema';
import { entity2Dto as roleEntity2Dto } from './user-role-mapper';
import { entity2Dto as statusEntity2Dto } from './user-status-mapper';
import { entity2Dto as studentEntity2Dto } from './student-mapper';

export const entity2Dto = (
  src: UserEntity,
  student: Student[],
  createdBy: SimpleUserDto,
  updatedBy: SimpleUserDto
): UserDto => {
  const { status, role, entitledStudentId, ...others } = src;
  return {
    ...others,
    entitledStudentId : entitledStudentId,
    entitledStudent: student.map(s => studentEntity2Dto(s)),
    role: roleEntity2Dto(role),
    status: statusEntity2Dto(status),
    createdBy,
    updatedBy
  };
};