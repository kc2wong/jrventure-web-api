import { _Error as ErrorModel } from '../__generated__/linkedup-backend-client';


export const createSystemError = (
  error: any,
  status?: number
): ErrorModel & { httpStatus: number } => {
  if ('code' in error && 'message' in error) {
    throw {
      code: error.code,
      message: error.message,
      parameter: error.parameter ?? [],
      httpStatus: status ?? 500,
    };
  } else {
    const message = error.message ?? error.toString();
    throw {
      code: 'UNEXPECTED_ERROR',
      message: message,
      httpStatus: 500,
    };
  }
};
