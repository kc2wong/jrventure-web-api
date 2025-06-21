import { components, paths } from '@openapi/schema';

export type FindStudentQueryDto =
  paths['/students']['get']['parameters']['query'];

export type FindStudent200ResponseDto =
  paths['/students']['get']['responses']['200']['content']['application/json'];

export type GetStudentByIdPathDto =
  paths['/students/{id}']['get']['parameters']['path'];

export type GetStudentById200ResponseDto =
  paths['/students/{id}']['get']['responses']['200']['content']['application/json'];

export type StudentDto = components['schemas']['Student'];
