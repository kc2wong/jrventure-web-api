import jsonwebtoken from 'jsonwebtoken';

import { User } from '@processapi/types.gen';
import { SimpleUserDto } from '@api/user/user-schema';
import { getStudentByIdRepo } from '@repo/student-repo';
import { entity2Dto as userEntity2Dto } from '@service/user/mapper/user-mapper';

const systemUser: SimpleUserDto = {
  id: '1',
  email: 'xxx@abc.com',
  name: { English: 'Administrator' },
};

const getEntitledStudents = async (
  authorizationToken: string,
  entitledStudentIds?: string[]
) => {
  if (!entitledStudentIds) return [];
  const students = await Promise.all(
    entitledStudentIds.map((i) => getStudentByIdRepo(authorizationToken, i))
  );
  return students.filter((s) => s !== undefined);
};

const generateSystemUserToken = () => {
  const payload = {
    user: {
      id: '1',
      entitledStudentId: [],
      role: 'Admin',
      withApprovalRight: true,
    },
  };
  return jsonwebtoken.sign(payload, 'secret', {
    expiresIn: new Date().getTime() + 1000 * 60 * 10,
  });
};

export const generateAuthResponse = async (
  userEntity: User
  // authorizationToken?: string
) => {
  const tempToken = generateSystemUserToken();
  const entitledStudents = await getEntitledStudents(
    tempToken,
    userEntity.entitledStudentId
  );
  const payload = {
    user: userEntity2Dto(userEntity, entitledStudents, systemUser, systemUser),
  };
  const token = jsonwebtoken.sign(payload, 'secret');

  const menu = {
    id: 'muRoot',
    label: 'Root',
    children: [
      {
        id: 'miUserMaintenance',
        label: 'User',
      },
    ],
  };

  return { token, menu };
};
