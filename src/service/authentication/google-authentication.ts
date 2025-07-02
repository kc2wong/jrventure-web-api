import { GoogleAuthenticationRequestDto } from '@api/authentication/authentication-schema';
import { SimpleUserDto } from '@api/user/user-schema';
import { googleAuthenticateRepo } from '@repo/user-authentication-repo';
import { findUserRepo } from '@repo/user-repo';
import { generateAuthResponse } from '@service/authentication/shared/base-authentication';

export const googleAuthenticationService = async ({
  type,
  token,
}: GoogleAuthenticationRequestDto) => {
  const result = await googleAuthenticateRepo(type, token);
  const { token: jwt, menu } = await generateAuthResponse(result.user);
  const parentUser: SimpleUserDto[] =
    result.user.role === 'Student'
      ? (
          await findUserRepo(jwt, {
            studentId: result.user.entitledStudentId[0],
          })
        )
          .filter((u) => u.role === 'Parent')
          .map(({ id, email, name }) => ({ id, email, name }))
      : [];
  return { status: result.status, token: jwt, menu, parentUser };
};
