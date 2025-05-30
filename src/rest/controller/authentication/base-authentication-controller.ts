import jsonwebtoken from 'jsonwebtoken';
import { SimpleUserDto } from '../../dto-schema';

import { User } from '../../../__generated__/linkedup-backend-client';
import { getStudentById as getStudentByIdRepo } from '../../../repo/student-repo';
import { entity2Dto as userEntity2Dto } from '../../../mapper/user-mapper';

const privateKey = `
-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDHfVPCctPbR9jz
AKh3k48VoGd+7vCHwAZKmfJplS4aQa5zq8PA1DJvqURzaxf0JZX0H7VuP0BW/0GN
c7aBy20G3L00n7oEREnVn0e8rgB2mTrI6zmkGZMS7lxtKTeXkIknmk0KyI+o4n0S
oI5DpPXYwTGb3wQ39F/2+Kh3jYl5gDx43eV/YWqN+lG64F1d/LLdJQKzphh6kqoa
rbNq8QnS1UL+jQ43XQ6kzPWXiFzFzF9iRFr8cZpS9O4WWMVKMfaPQaxFQUZZn+qJ
rMHDK/0zku53RzM3WzXBGPjKPXqEZUBK3bAa2rhR4eu6XqL5vLtEC7R6uzBss7bF
uTrU3IhBAgMBAAECggEAWTQo9XsGVl0kOe5ah5dqjClFlxg6PbSYY0t/hSh6smUE
fnL+JqP2JKdUGAcm5EfZ9rbMc2F63RMlhdpJybS2zIM5gPP2AqcpzSkiwQ90wlF0
+Y6u95YZq6wZ0Z3fPSWscn9YZft/6Am7NxTMSLw4Icth9Jfcb7S4n2b+nkI7PS1W
h8e/EKXIBffoKqku2hehDkhWyEF3wUzyz39tRYLGqcyhdYYw9WvNQv6vVlyRwrvJ
8QEF5NCX40AgB2yIPw+U3N0VJW5CQQXbHX26HzTvE53uP5nCwqS6OSXnYMIWcoBh
GfL24eCPSskx8y2Ho/5Rf9x7m2FFKnA7Ty+jPrWJzHfMO12+a9W1EQKBgQD7CA3B
e4KwjzgSRwa1bya/JB+ZbbxVRX5EkaTcuP1sLP8tJvwjyyFov6glAdWgnXwxKrBi
RIRoxq0HnsGwrf8jXPRqT1QJQkTVgHogX8VDBfRykGwZhj0XfVFlJp6y/4N2DX8H
TKP7gMvm+e4vhvytPZUv8uTiGd0NBVg+5T+XtwKBgQDFVr3IFCTut1MzWDHqgcGo
bfPBxNqjzjZ/7jUbBfX4xDU/4e4j9jcMJ3NZrB7RQyKYR6eoItyD1R/7+H2Zr8AQ
0lnuAjkTLj7pl+QmtPQa2zVbPI0gkLoifXI9C4XbwS4WbQCl3wMC8s9qkjzzDEYo
+Kqyiq3+jGxEG7bSu6hPfQKBgQDQuM5sVJG6Quzy7GzGyaMV4D5x7g1AuIFpxbEU
zLrU4bhJ1H0vNs/XkmtbDTjCV+IlUug7X8WbAF29y71AZvA5Rrf/Ng5vbySHsR4h
nRBkEQ2Ofi82Aru8UCoKMKcoyxPOuX7q4UtvvRuHeg26Irm8T/6TUX3JD2hChBFR
JWhl+QKBgQCV7fG2Og9WCEvpHx5SRwzVuhW+mZKhRPw8cwkWkYPY0vBNBqssmPPA
3whg3vprQqWKUItfQuwTmdgyu1v/bp5X+8gKaA8fIYvLgfMyXgdYdk0BFCs5Zn9r
+cgxUcd2VLtSU4VaZwK1+OjlvAXtwxgmlJykfD7eZLzUm3hxHrwF/w==
-----END PRIVATE KEY-----
`;

const systemUser: SimpleUserDto = {
  id: '1',
  email: 'xxx@abc.com',
  name: { English: 'Administrator' },
};

const tempUser = {
  id: '1',
  withApprovalRight: true,
  entitledStudentId: [],
  role: 'Admin',
};

const getEntitledStudents = async (
  entitledStudentIds?: string[],
  authorizationToken?: string
) => {
  if (!entitledStudentIds) return [];
  const students = await Promise.all(
    entitledStudentIds.map((i) => getStudentByIdRepo(i, authorizationToken))
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
  userEntity: User,
  authorizationToken?: string
) => {
  const tempToken = generateSystemUserToken();
  const entitledStudents = await getEntitledStudents(
    userEntity.entitledStudentId,
    tempToken
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
