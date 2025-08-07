import { listActivityCategory } from '@processapi/sdk.gen';
import { ActivityCategory } from '@processapi/types.gen';

import { callRepo } from './repo-util';

export const listActivityCategoryRepo = async (
  authorizationToken: string
): Promise<ActivityCategory[]> => {
  return await callRepo((headers) => {
    return listActivityCategory({ headers });
  }, authorizationToken);
};
