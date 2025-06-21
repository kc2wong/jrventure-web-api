import { dto2Entity as datetimeDto2Entity } from '@service/shared/mapper/datetime-mapper';
import { dto2Entity as statusDto2Entity } from '@service/activity/mapper/activity-status-mapper';
import { entity2Dto } from '@service/activity/mapper/activity-mapper';

import { asArray } from '@util/array-util';
import {
  FindActivity200ResponseDto,
  FindActivityQueryDto,
} from '@api/activity/activity-schema';
import { findActivityRepo } from '@repo/activity-repo';

export const findActivityService = async (
  jwt: string,
  query: FindActivityQueryDto
): Promise<FindActivity200ResponseDto> => {
  const {
    status: rawStatus,
    startDateFrom,
    startDateTo,
    endDateFrom,
    endDateTo,
    ...rest
  } = query;
  const status = asArray(rawStatus);

  const { data, limit, offset, total } = await findActivityRepo(jwt, {
    status: status ? status.map((s) => statusDto2Entity(s)) : undefined,
    startDateFrom: startDateFrom
      ? datetimeDto2Entity(startDateFrom)
      : undefined,
    startDateTo: startDateTo ? datetimeDto2Entity(startDateTo) : undefined,
    endDateFrom: endDateFrom ? datetimeDto2Entity(endDateFrom) : undefined,
    endDateTo: endDateTo ? datetimeDto2Entity(endDateTo) : undefined,
    ...rest,
  });

  return {
    limit,
    offset,
    total,
    data: data.map((item) => entity2Dto(item)),
  };
};
