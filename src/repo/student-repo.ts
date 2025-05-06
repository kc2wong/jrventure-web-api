import { createSystemError } from './error-util';
import { backendApiClient } from './backend-api-client';
import { Student } from '../__generated__/linkedup-backend-client';

export const getStudentById = async (
  id: string
): Promise<Student | undefined> => {
  try {
    const result = await backendApiClient.student.findStudent([id]);
    return result.length === 1 ? result[0] : undefined;
  } catch (error: any) {
    throw createSystemError(error);
  }
};

export const findStudent = async (
  ids?: string[],
  classId?: string,
  name?: string
): Promise<Student[]> => {
  try {
    return await backendApiClient.student.findStudent(ids, classId, name);
  } catch (error: any) {
    throw createSystemError(error);
  }
};
