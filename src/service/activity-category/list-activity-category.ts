
import { ListActivityCategory200ResponseDto } from '@api/activity-category/activity-category-schema';
import { listActivityCategoryRepo } from '@repo/activity-category-repo';
import { entity2Dto } from '@service/activity-category/mapper/activity-category-mapper';
import { logger } from '@util/logging-util';

export const listActivityCategoryService = async (
  jwt: string
): Promise<ListActivityCategory200ResponseDto> => {
  logger.info('listActivityCategoryService() - start');
  const activityCategories = await listActivityCategoryRepo(jwt);
  const result = activityCategories.map((item) => entity2Dto(item));
  logger.info('listActivityCategoryService() - end');
  return result;
};
