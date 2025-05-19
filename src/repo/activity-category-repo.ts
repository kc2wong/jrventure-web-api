import {
  listActivityCategory as listActivityCategoryRepo,
  ActivityCategory,
} from '../__generated__/linkedup-backend-client';
import { callRepo } from './repo-util';

export const listActivityCategory = async (
  authorizationToken?: string
): Promise<ActivityCategory[]> => {
  return await callRepo(() => listActivityCategoryRepo(), authorizationToken);
};
