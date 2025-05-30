import { Student } from '../__generated__/linkedup-backend-client';
import { StudentDto } from '../rest/dto-schema';

export const entity2Dto = ({
  lastName,
  firstName,
  ...rest
}: Student): StudentDto => {
  const name = {
    English: `${firstName.English} ${lastName.English}`,
    TraditionalChinese: `${lastName.TraditionalChinese}${firstName.TraditionalChinese}`,
    SimplifiedChinese: `${lastName.SimplifiedChinese}${firstName.SimplifiedChinese}`,
  };

  return {
    name,
    ...rest,
  };
};
