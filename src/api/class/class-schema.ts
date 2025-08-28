import { components, paths } from '@openapi/schema';

export type FindClassQueryDto = paths['/classes']['get']['parameters']['query'];

export type FindClass200ResponseDto =
  paths['/classes']['get']['responses']['200']['content']['application/json'];

export type ClassDto = components['schemas']['Class'];
