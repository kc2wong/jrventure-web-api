import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  if (err.httpStatus && err.code && err.message) {
    const errorDto = {
      code: err.code,
      parameter: err.parameter ?? [],
      message: err.message,
    };
    res.status(err.httpStatus).json(errorDto);
  }
  else {
    const errorDto = {
      code: 'INTERNAL_SERVER_ERROR',
      parameter: [],
      message: err.message,
    };
    res.status(500).json(errorDto);
  }
};
