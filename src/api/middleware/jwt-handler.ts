import { Request, Response, NextFunction } from 'express';
import jsonwebtoken from 'jsonwebtoken';

export const jwtHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.cookies.jwt ?? req.headers.authorization;
  if (token) {
    const jwt = token.toLowerCase().startsWith('bearer ')
      ? token.slice(7) // Remove 'Bearer ' prefix if present
      : token; // Use the token as is if no prefix
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
