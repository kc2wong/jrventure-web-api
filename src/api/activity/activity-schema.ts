import { components, paths } from '@openapi/schema';

export type FindActivityQueryDto =
  paths['/activities']['get']['parameters']['query'];

export type FindActivity200ResponseDto =
  paths['/activities']['get']['responses']['200']['content']['application/json'];

export type CreateActivityRequestDto =
  paths['/activities']['post']['requestBody']['content']['application/json'];

export type CreateActivity201ResponseDto =
  paths['/activities']['post']['responses']['201']['content']['application/json'];

export type GetActivityByIdPathDto =
  paths['/activities/{id}']['get']['parameters']['path'];

export type GetActivityById200ResponseDto =
  paths['/activities/{id}']['get']['responses']['200']['content']['application/json'];

export type UpdateActivityByIdPathDto =
  paths['/activities/{id}']['put']['parameters']['path'];

export type UpdateActivityByIdRequestDto =
  paths['/activities/{id}']['put']['requestBody']['content']['application/json'];

export type UpdateActivityById200ResponseDto =
  paths['/activities/{id}']['put']['responses']['200']['content']['application/json'];

export type ActivityStatusDto = components['schemas']['ActivityStatus'];
export type AchievementSubmissionRoleDto =
  components['schemas']['AchievementSubmissionRole'];
export type ActivityPayloadDto = components['schemas']['ActivityPayload'];
export type ActivityDto = components['schemas']['Activity'];
export type ActivityDetailDto = components['schemas']['ActivityDetail'];
