import { CircularDetailDto } from '@api/circular/circular-schema';
import { getCircularByIdRepo } from '@repo/circular-repo';
import { entity2DetailDto } from '@service/circular/mapper/circular-mapper';
import { getCreatedUpdatedByService } from '@service/user/shared/enrich-user';

export const getCircularByIdService = async (
  jwt: string,
  id: string
): Promise<CircularDetailDto> => {
  const circular = await getCircularByIdRepo(jwt, id, false);
  const userMap = await getCreatedUpdatedByService(
    jwt,
    circular ? [circular] : [],
    circular.distributedBy ? [circular.distributedBy] : undefined
  );

  return entity2DetailDto(
    circular,
    userMap.get(circular.createdBy),
    userMap.get(circular.updatedBy),
    circular.distributedBy ? userMap.get(circular.distributedBy) : undefined
  );
};
