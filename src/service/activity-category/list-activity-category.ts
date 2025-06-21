import { entity2Dto } from '@service/activity-category/mapper/activity-category-mapper';

import { ListActivityCategory200ResponseDto } from '@api/activity-category/activity-category-schema';
import { listActivityCategoryRepo } from '@repo/activity-category-repo';

export const listActivityCategoryService = async (
  jwt: string
): Promise<ListActivityCategory200ResponseDto> => {
  const activityCategories = await listActivityCategoryRepo(jwt);
  return activityCategories.map((item) => entity2Dto(item));
};
