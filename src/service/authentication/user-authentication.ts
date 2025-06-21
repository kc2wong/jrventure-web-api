import { SimpleUserDto } from '@api/user/user-schema';
import { authenticateUserRepo } from '@repo/user-authentication-repo';
import { findUserRepo } from '@repo/user-repo';
import { generateAuthResponse } from '@service/authentication/shared/base-authentication';

export const userAuthenticationService = async (
  email: string,
  password: string
) => {
  const result = await authenticateUserRepo(email, password);
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
  return { status: result.status, token, menu, parentUser: parentUser };
};
