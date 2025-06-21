import { paths } from '@openapi/schema';

export type PresignedUrlPostRequestBodyDto =
  paths['/media/presigned-urls']['post']['requestBody']['content']['application/json'];

export type PresignedUrlPost200ResponseDto =
  paths['/media/presigned-urls']['post']['responses']['200']['content']['application/json'];
