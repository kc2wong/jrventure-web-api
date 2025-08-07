import { ActivityStatusDto } from '@api/activity/activity-schema';
import { ActivityStatus } from '@processapi/types.gen';

export const entity2Dto = (src: ActivityStatus): ActivityStatusDto => {
  return src;
};

export const dto2Entity = (src: ActivityStatusDto): ActivityStatus => {
  return src;
};
