import {
  ActivityDetailDto,
  CreateActivityRequestDto,
} from '@api/activity/activity-schema';
import { createActivityRepo } from '@repo/activity-repo';
import {
  entity2DetailDto,
  payloadDto2Entity,
} from '@service/activity/mapper/activity-mapper';
import { getCreatedUpdatedByService } from '@service/user/shared/enrich-user';

export const createActivityService = async (
  jwt: string,
  request: CreateActivityRequestDto
): Promise<ActivityDetailDto> => {
  const payload = payloadDto2Entity(request);

  const newActivity = await createActivityRepo(jwt, payload);
  const createdUpdatedByMap = await getCreatedUpdatedByService(jwt, [
    newActivity,
  ]);

  const activityDto = entity2DetailDto(
    newActivity,
    createdUpdatedByMap.get(newActivity.createdBy)!,
    createdUpdatedByMap.get(newActivity.updatedBy)!
  );
  return activityDto;
};
