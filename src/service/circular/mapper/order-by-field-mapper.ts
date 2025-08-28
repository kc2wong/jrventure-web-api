import { FindCircularOrderByFieldDto } from '@api/circular/circular-schema';
import { FindCircularOrderByField } from '@processapi/types.gen';

export const dto2Entity = (src: FindCircularOrderByFieldDto): FindCircularOrderByField => {
  return src;
};
