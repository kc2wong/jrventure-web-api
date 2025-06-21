import { components, paths } from '@openapi/schema';

export type ListActivityCategory200ResponseDto =
  paths['/activity-categories']['get']['responses']['200']['content']['application/json'];

export type ActivityCategoryDto = components['schemas']['ActivityCategory'];
