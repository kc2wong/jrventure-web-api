import {
  UpdateCircularByIdRequestDto,
  CircularDto,
} from '@api/circular/circular-schema';
import { updateCircularRepo } from '@repo/circular-repo';
import {
  entity2Dto,
  payloadDto2Entity,
} from '@service/circular/mapper/circular-mapper';
import { privateBucketName } from '@util/s3-util';

export const updateCircularService = async (
  jwt: string,
  id: string,
  request: UpdateCircularByIdRequestDto
): Promise<CircularDto> => {
  const version = request.version;
  const payload = payloadDto2Entity(request, privateBucketName);

  const updatedActivity = await updateCircularRepo(jwt, id, version, payload);

  return entity2Dto(updatedActivity);
};
