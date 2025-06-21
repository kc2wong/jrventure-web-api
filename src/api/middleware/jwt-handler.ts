import { Request, Response, NextFunction } from 'express';
import jsonwebtoken from 'jsonwebtoken';

export const jwtHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
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
