import { StudentDto } from '@api/student/student-schema';
import { Student } from '@processapi/types.gen';

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
