import { paths, components } from '../__generated__/openapi/schema';

type UserAuthenticationPostRequestDto =
  paths['/user-authentications']['post']['requestBody']['content']['application/json'];

type UserAuthenticationPost200ResponseDto =
  paths['/user-authentications']['post']['responses']['200']['content']['application/json'];

type UserRegisterationPostRequestDto =
  paths['/user-registrations']['post']['requestBody']['content']['application/json'];

type UserRegistrationPost201ResponseDto =
  paths['/user-registrations']['post']['responses']['201']['content']['application/json'];

type GoogleAuthenticationPostRequestDto =
  paths['/google-authentications']['post']['requestBody']['content']['application/json'];

type GoogleAuthenticationPost200ResponseDto =
  paths['/google-authentications']['post']['responses']['200']['content']['application/json'];

type FindUserQueryDto = paths['/users']['get']['parameters']['query'];

type FindUser200ResponseDto =
  paths['/users']['get']['responses']['200']['content']['application/json'];

type FindStudentQueryDto = paths['/students']['get']['parameters']['query'];

type FindStudent200ResponseDto =
  paths['/students']['get']['responses']['200']['content']['application/json'];

type GetStudentByIdPathDto =
  paths['/students/{id}']['get']['parameters']['path'];

  type GetStudentById200ResponseDto =
  paths['/students/{id}']['get']['responses']['200']['content']['application/json'];

type GetUserByIdPathDto = paths['/users/{id}']['get']['parameters']['path'];

type GetUserById200ResponseDto =
  paths['/users/{id}']['get']['responses']['200']['content']['application/json'];

type UsersPostRequestDto =
  paths['/users']['post']['requestBody']['content']['application/json'];

type UsersPost201ResponseDto =
  paths['/users']['post']['responses']['201']['content']['application/json'];

type UsersPutRequestPathDto = paths['/users/{id}']['put']['parameters']['path'];

type UsersPutRequestBodyDto =
  paths['/users/{id}']['put']['requestBody']['content']['application/json'];

type UsersPut200ResponseDto =
  paths['/users/{id}']['put']['responses']['200']['content']['application/json'];

type SimpleUserDto = components['schemas']['SimpleUser'];
type UserDto = components['schemas']['User'];
type UserRoleDto = components['schemas']['UserRole'];
type UserStatusDto = components['schemas']['UserStatus'];
type StudentDto = components['schemas']['Student'];

type ErrorDto = components['schemas']['Error'];
type BadRequestErrorDto = ErrorDto & { status: 400 };
class NotFoundErrorDto implements ErrorDto {
  code: string;
  message: string;
  parameter?: string[];
  httpStatus: number = 404;

  constructor(code: string, message: string, parameter?: string[]) {
    this.code = code;
    this.message = message;
    if (parameter) this.parameter = parameter;
  }
}

type UnauthorizedErrorDto = ErrorDto & { httpStatus: 401 };
type InternalServerErrorDto = ErrorDto & { httpStatus: 500 };

export {
  UserAuthenticationPostRequestDto,
  UserAuthenticationPost200ResponseDto,
  GoogleAuthenticationPostRequestDto,
  GoogleAuthenticationPost200ResponseDto,
  UserRegisterationPostRequestDto,
  UserRegistrationPost201ResponseDto,
  FindUserQueryDto,
  FindUser200ResponseDto,
  FindStudentQueryDto,
  FindStudent200ResponseDto,
  GetStudentByIdPathDto,
  GetStudentById200ResponseDto,
  GetUserByIdPathDto,
  GetUserById200ResponseDto,
  UsersPostRequestDto,
  UsersPost201ResponseDto,
  UsersPutRequestPathDto,
  UsersPutRequestBodyDto,
  UsersPut200ResponseDto,
  BadRequestErrorDto,
  NotFoundErrorDto,
  UnauthorizedErrorDto,
  InternalServerErrorDto,
  SimpleUserDto,
  UserDto,
  UserRoleDto,
  UserStatusDto,
  StudentDto,
};