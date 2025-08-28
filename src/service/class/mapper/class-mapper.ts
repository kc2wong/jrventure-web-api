import { ClassDto } from '@api/class/class-schema';
import { Class } from '@processapi/types.gen';

export const entity2Dto = (src: Class): ClassDto => {
  return {
    ...src,
  };
};
