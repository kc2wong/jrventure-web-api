import {
  FindCircular200ResponseDto,
  FindCircularQueryDto,
} from '@api/circular/circular-schema';
import { findCircularRepo } from '@repo/circular-repo';
import { entity2Dto } from '@service/circular/mapper/circular-mapper';
import { dto2Entity as statusDto2Entity } from '@service/circular/mapper/circular-status-mapper';
import { dto2Entity as orderByFieldDto2Entity } from '@service/circular/mapper/order-by-field-mapper';
import { dto2Entity as datetimeDto2Entity } from '@service/shared/mapper/datetime-mapper';
import { dto2Entity as orderByDirectionDto2Entity } from '@service/shared/mapper/order-by-direction-mapper';
import { asArray } from '@util/array-util';

export const findCircularService = async (
  jwt: string,
  query: FindCircularQueryDto
): Promise<FindCircular200ResponseDto> => {
  query?.orderByField;
  const {
    status: rawStatus,
    dueAtFrom,
    dueAtTo,
    orderByField,
    orderByDirection,
    ...rest
  } = query;
  const status = asArray(rawStatus);

  const { data, limit, offset, total } = await findCircularRepo(jwt, {
    status: status ? status.map((s) => statusDto2Entity(s)) : undefined,
    dueDateFrom: dueAtFrom ? datetimeDto2Entity(dueAtFrom) : undefined,
    dueDateTo: dueAtTo ? datetimeDto2Entity(dueAtTo) : undefined,
    orderByField: orderByFieldDto2Entity(orderByField),
    orderByDirection: orderByDirectionDto2Entity(orderByDirection),
    ...rest,
  });

  return {
    limit,
    offset,
    total,
    data: data.map((item) => entity2Dto(item)),
  };
};
