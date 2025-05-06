import { Error as ErrorModel } from '../__generated__/linkedup-backend-client/models/Error';

const getErrorStatus = (error: any): number | undefined => {
  if (
    error &&
    typeof error === 'object' &&
    'status' in error &&
    typeof error.status === 'number' &&
    Number.isInteger(error.status)
  ) {
    return error.status;
  }

  return undefined;
};

export const createSystemError = (
  error: any
): ErrorModel & { httpStatus: number } => {
  const httpStatus = getErrorStatus(error);
  if (httpStatus && error.body && error.body.code && error.body.message) {
    const errorModel = error.body;
    throw { httpStatus, ...errorModel };
  } else {
    const message = error.message ?? error.toString();
    throw {
      code: 'UNEXPECTED_ERROR',
      message: message,
      httpStatus: 500,
    };
  }
};
