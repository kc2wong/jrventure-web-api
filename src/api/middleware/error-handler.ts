import { Request, Response, NextFunction } from 'express';

import { logger } from '@util/logging-util';

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  _next: NextFunction
): void => {
  logger.info(`err = ${JSON.stringify(err)}`)
  if (err.httpStatus && err.code && err.message) {
    const errorDto = {
      code: err.code,
      parameter: err.parameter ?? [],
      message: err.message,
    };
    res.status(err.httpStatus).json(errorDto);
  }
  else if (err.httpStatus && err.httpStatus === 404) {
    const errorDto = {
      code: 'PATH_NOT_FOUND',
      parameter: [req.path],
      message: `path ${req.path} is not found`,
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
