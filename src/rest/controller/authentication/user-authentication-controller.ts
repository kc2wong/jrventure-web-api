import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import {
  UserAuthenticationPostRequestDto,
  UserAuthenticationPost200ResponseDto,
} from '../../dto-schema';
import { AuthenticationStatus } from '../../../__generated__/linkedup-backend-client';
import { authenticateUser } from '../../../repo/user-authentication-repo';
import { getStudentById as getStudentByIdRepo } from '../../../repo/student-repo';
import { entity2Dto as studentEntity2Dto } from '../../../mapper/student-mapper';

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

export const userAuthenticationPost = async (
  req: Request<{}, {}, UserAuthenticationPostRequestDto, {}>,
  res: Response<UserAuthenticationPost200ResponseDto>,
  next: NextFunction
) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const { user, status } = await authenticateUser(email, password);

    const token = jwt.sign({ user: user }, 'secret');
    const entitledStudents = user.entitledStudentId
      ? (
          await Promise.all(
            user.entitledStudentId?.map((id) => getStudentByIdRepo(id))
          )
        ).filter((s) => s !== undefined)
      : [];

    if (status == AuthenticationStatus.SUCCESS) {
      const resp = {
        token: token,
        entitledStudents,
        menu: {
          id: 'muRoot',
          label: 'Root',
          // children: [
          //   {
          //     id: 'muSecurity',
          //     label: 'Security',
          //     children: [
          //       {
          //         id: 'miUserMaintenance',
          //         label: 'User',
          //       },
          //     ],
          //   },
          // ],
          children: [
            {
              id: 'miUserMaintenance',
              label: 'User',
            },
          ],
        },
      };
      res.status(200).json(resp);
      return;
    }
    res.status(200).json({
      token,
      entitledStudents: [],
      menu: {
        id: '',
        label: '',
        children: undefined,
      },
    });
  } catch (error: any) {
    console.log(`error = ${JSON.stringify(error)}`);
    next(error);
  }
};
