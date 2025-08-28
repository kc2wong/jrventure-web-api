import { components, paths } from '@openapi/schema';

export type FindCircularQueryDto =
  paths['/circulars']['get']['parameters']['query'];

export type FindCircularOrderByFieldDto =
  components['schemas']['FindCircularOrderByField'];

export type FindCircular200ResponseDto =
  paths['/circulars']['get']['responses']['200']['content']['application/json'];

export type CreateCircularRequestDto =
  paths['/circulars']['post']['requestBody']['content']['application/json'];

export type CreateCircular201ResponseDto =
  paths['/circulars']['post']['responses']['201']['content']['application/json'];

export type GetCircularByIdPathDto =
  paths['/circulars/{id}']['get']['parameters']['path'];

export type GetCircularById200ResponseDto =
  paths['/circulars/{id}']['get']['responses']['200']['content']['application/json'];

export type UpdateCircularByIdPathDto =
  paths['/circulars/{id}']['put']['parameters']['path'];

export type UpdateCircularByIdRequestDto =
  paths['/circulars/{id}']['put']['requestBody']['content']['application/json'];

export type UpdateCircularById200ResponseDto =
  paths['/circulars/{id}']['put']['responses']['200']['content']['application/json'];

export type CircularStatusDto = components['schemas']['CircularStatus'];
export type CircularPayloadDto = components['schemas']['CircularPayload'];
export type CircularDto = components['schemas']['Circular'];
export type CircularDetailDto = components['schemas']['CircularDetail'];
export type CircularAttachmentPayloadDto =
  components['schemas']['CircularAttachmentPayload'];
export type CircularAttachmentDto = components['schemas']['CircularAttachment'];
