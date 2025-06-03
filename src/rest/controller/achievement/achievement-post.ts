import { Request, Response, NextFunction } from 'express';
import {
  AchievementPost201ResponseDto,
  AchievementPostRequestBodyDto,
} from '../../dto-schema';
import { createAchievement as createAchievementRepo } from '../../../repo/achievement-repo';
import {
  creationDto2Entity,
  entity2Dto,
} from '../../../mapper/achievement-mapper';
import { creationDto2Entity as attachmentCreationDto2Entity } from '../../../mapper/achievement-approval-attachment-mapper';

export const createAchievement = async (
  req: Request<{}, {}, AchievementPostRequestBodyDto, {}>,
  res: Response<AchievementPost201ResponseDto>,
  next: NextFunction
) => {
  try {
    const { attachment, ...rest } = req.body;
    const payload = creationDto2Entity(rest);
    const newAchievement = await createAchievementRepo(
      res.locals.jwt,
      payload,
      attachment.map((atch) => attachmentCreationDto2Entity(atch))
    );

    const achievementDto = entity2Dto(newAchievement);
    res.status(201).json(achievementDto);
  } catch (error: any) {
    next(error);
  }
};
