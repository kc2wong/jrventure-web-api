import { CircularStatusDto } from '@api/circular/circular-schema';
import { CircularStatus } from '@processapi/types.gen';

export const entity2Dto = (src: CircularStatus): CircularStatusDto => {
  return src;
};

export const dto2Entity = (src: CircularStatusDto): CircularStatus => {
  return src;
};
