import jsonwebtoken from 'jsonwebtoken';

import { SimpleUserDto } from '@api/user/user-schema';
import { authenticateUserRepo } from '@repo/user-authentication-repo';
import { findUserRepo } from '@repo/user-repo';
import { generateAuthResponse } from '@service/authentication/shared/base-authentication';
import { getUserByIdService } from '@service/user/get-user';
import { logger } from '@util/logging-util';

type OneOnly<T> = {
  [K in keyof T]: { [P in K]: T[P] } & Partial<
    Record<Exclude<keyof T, K>, undefined>
  >;
}[keyof T];

const getParentUsers = async (
  jwt: string,
  role: string,
  entitledStudentId: string[]
): Promise<SimpleUserDto[]> => {
  if (role !== 'Student') {
    return [];
  }

  const users = await findUserRepo(jwt, { studentId: entitledStudentId[0] });

  return users
    .filter((u) => u.role === 'Parent')
    .map(({ id, email, name }) => ({ id, email, name }));
};

const handleUser = async (user: any) => {
  const { token, menu } = await generateAuthResponse(user);
  const parentUser = await getParentUsers(
    token,
    user.role,
    user.entitledStudentId
  );
  return { status: user.status, token, menu, parentUser };
};

export const userAuthenticationService = async (
  arg: OneOnly<{
    token: { jwt: string };
    credential: { email: string; password: string };
  }>
) => {
  try {
    logger.info('userAuthenticationService() - start');
    if (arg.credential) {
      const { email, password } = arg.credential;
      const result = await authenticateUserRepo(email, password);
      return await handleUser(result.user);
    } else {
      const jwt = arg.token.jwt;
      const payload = jsonwebtoken.verify(jwt, 'secret') as any;
      const { id: userId } = payload.user;
      const { createdBy, updatedBy, ...rest } = await getUserByIdService(
        jwt,
        userId
      );

      const hydratedUser = {
        ...rest,
        createdBy: createdBy.id,
        updatedBy: updatedBy.id,
      };
      return await handleUser(hydratedUser);
    }
  } finally {
    logger.info('userAuthenticationService() - end');
  }
};
