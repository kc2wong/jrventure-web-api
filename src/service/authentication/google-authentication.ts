import { SimpleUserDto } from '@api/user/user-schema';
import { googleAuthenticateRepo } from '@repo/user-authentication-repo';
import { findUserRepo } from '@repo/user-repo';
import { generateAuthResponse } from '@service/authentication/shared/base-authentication';

export const googleAuthenticationService = async (accessToken: string) => {
  const result = await googleAuthenticateRepo(accessToken);

  const { token, menu } = await generateAuthResponse(result.user);
  const parentUser: SimpleUserDto[] =
    result.user.role === 'Student'
      ? (
          await findUserRepo(token, {
            studentId: result.user.entitledStudentId[0],
          })
        )
          .filter((u) => u.role === 'Parent')
          .map(({ id, email, name }) => ({ id, email, name }))
      : [];
  return { status: result.status, token, menu, parentUser };
};
