import {
  Student,
} from '../__generated__/linkedup-backend-client';
import {
  StudentDto,
} from '../rest/dto-schema';

export const entity2Dto = (src: Student): StudentDto => {
  return {
    ...src,
  };
};
