import { Request, Response, NextFunction } from 'express';
import jsonwebtoken from 'jsonwebtoken';
import { UserDto } from '../dto-schema';

export const jwtHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  // const jwt = req.headers.authorization;
  const jwt = req.cookies.jwt;
  if (jwt) {
    const payload = jsonwebtoken.verify(jwt, 'secret') as any;
    const { id, role, withApprovalRight, entitledStudentId } = payload.user;
    res.locals.authenticatedUser = {
      id,
      role,
      withApprovalRight,
      entitledStudentId,
    };
    res.locals.jwt = jwt;
  }
  next();
};
