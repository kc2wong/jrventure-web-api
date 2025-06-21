import { ActivityCategory } from '@processapi/types.gen';
import { callRepo } from './repo-util';
import { listActivityCategory } from '@processapi/sdk.gen';

export const listActivityCategoryRepo = async (
  authorizationToken: string
): Promise<ActivityCategory[]> => {
  return await callRepo((headers) => {
    return listActivityCategory({ headers });
  }, authorizationToken);
};
