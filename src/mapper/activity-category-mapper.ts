import { ActivityCategory } from '../__generated__/linkedup-backend-client';
import { ActivityCategoryDto } from '../rest/dto-schema';

export const entity2Dto = (src: ActivityCategory): ActivityCategoryDto => {
  return {
    ...src,
  };
};
