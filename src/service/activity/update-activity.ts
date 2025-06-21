import {
  ActivityDetailDto,
  UpdateActivityByIdRequestDto,
} from '@api/activity/activity-schema';
import { updateActivityRepo } from '@repo/activity-repo';
import {
  entity2DetailDto,
  payloadDto2Entity,
} from '@service/activity/mapper/activity-mapper';
import { getCreatedUpdatedByService } from '@service/user/shared/enrich-user';

export const updateActivityService = async (
  jwt: string,
  id: string,
  request: UpdateActivityByIdRequestDto
): Promise<ActivityDetailDto> => {
  const version = request.version;
  const payload = payloadDto2Entity(request);

  const updatedActivity = await updateActivityRepo(jwt, id, version, payload);
  const createdUpdatedByMap = await getCreatedUpdatedByService(jwt, [
    updatedActivity,
  ]);

  const activityDto = entity2DetailDto(
    updatedActivity,
    createdUpdatedByMap.get(updatedActivity.createdBy)!,
    createdUpdatedByMap.get(updatedActivity.updatedBy)!
  );
  return activityDto;
};
