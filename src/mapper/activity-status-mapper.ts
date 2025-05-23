import { ActivityStatus as ActivityStatusEntity } from '../__generated__/linkedup-backend-client';
import { ActivityStatusDto } from '../rest/dto-schema';


export const entity2Dto = (src: ActivityStatusEntity): ActivityStatusDto => {
  return src;
};

export const dto2Entity = (src: ActivityStatusDto): ActivityStatusEntity => {
  return src;
};
