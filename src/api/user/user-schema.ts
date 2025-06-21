import { components, paths } from '@openapi/schema';

export type FindUserQueryDto = NonNullable<
  paths['/users']['get']['parameters']['query']
>;

export type FindUser200ResponseDto =
  paths['/users']['get']['responses']['200']['content']['application/json'];

export type GetUserByIdPathDto =
  paths['/users/{id}']['get']['parameters']['path'];

export type CreateUserRequestDto = NonNullable<
  paths['/users']['post']['requestBody']['content']['application/json']
>;

export type CreateUser201ResponseDto =
  paths['/users']['post']['responses']['201']['content']['application/json'];

export type GetUserById200ResponseDto =
  paths['/users/{id}']['get']['responses']['200']['content']['application/json'];

export type UpdateUserByIdPathDto =
  paths['/users/{id}']['put']['parameters']['path'];

export type UpdateUserByIdRequestDto = NonNullable<
  paths['/users/{id}']['put']['requestBody']['content']['application/json']
>;

export type UpdateUserById200ResponseDto =
  paths['/users/{id}']['put']['responses']['200']['content']['application/json'];

export type RegisterUserRequestDto = NonNullable<
  paths['/user-registrations']['post']['requestBody']['content']['application/json']
>;

export type RegisterUser201ResponseDto =
  paths['/user-registrations']['post']['responses']['201']['content']['application/json'];

export type UserDto = components['schemas']['User'];
export type SimpleUserDto = components['schemas']['SimpleUser'];
export type UserRoleDto = components['schemas']['UserRole'];
export type UserStatusDto = components['schemas']['UserStatus'];
