import { entity2DetailDto } from '@service/activity/mapper/activity-mapper';

import { getCreatedUpdatedByService } from '@service/user/shared/enrich-user';

import { ActivityDetailDto } from '@api/activity/activity-schema';
import { getActivityByIdRepo } from '@repo/activity-repo';

export const getActivityByIdService = async (
  jwt: string,
  id: string
): Promise<ActivityDetailDto> => {
  const activity = await getActivityByIdRepo(jwt, id, false);
  const userMap = await getCreatedUpdatedByService(jwt, activity ? [activity] : []);  // activity wont' be undefined

  return entity2DetailDto(
    activity,
    userMap.get(activity.createdBy),
    userMap.get(activity.updatedBy)
  );
};
