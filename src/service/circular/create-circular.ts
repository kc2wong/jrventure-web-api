import {
  CircularDto,
  CreateCircularRequestDto,
} from '@api/circular/circular-schema';
import { createCircularRepo } from '@repo/circular-repo';
import {
  entity2Dto,
  payloadDto2Entity,
} from '@service/circular/mapper/circular-mapper';
import { privateBucketName } from '@util/s3-util';

export const createCircularService = async (
  jwt: string,
  request: CreateCircularRequestDto
): Promise<CircularDto> => {
  const payload = payloadDto2Entity(request, privateBucketName);

  const newCircular = await createCircularRepo(jwt, payload);
  return entity2Dto(newCircular);
};
