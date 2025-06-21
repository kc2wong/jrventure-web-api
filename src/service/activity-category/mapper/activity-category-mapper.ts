import { ActivityCategoryDto } from '@api/activity-category/activity-category-schema';
import { ActivityCategory } from '@processapi/types.gen';

export const entity2Dto = (src: ActivityCategory): ActivityCategoryDto => {
  return {
    ...src,
  };
};
