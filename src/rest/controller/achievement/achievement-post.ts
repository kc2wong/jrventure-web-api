import { Request, Response, NextFunction } from 'express';
import { AchievementPost201ResponseDto, AchievementPostRequestBodyDto } from '../../dto-schema';
import { createAchievement as createAchievementRepo,  } from '../../../repo/achievement-repo';
import {
  creationDto2Entity,
  entity2Dto,
} from '../../../mapper/achievement-mapper';

export const createAchievement = async (
  req: Request<{}, {}, AchievementPostRequestBodyDto, {}>,
  res: Response<AchievementPost201ResponseDto>,

  next: NextFunction
) => {
  try {
    const payload = creationDto2Entity(req.body);

    const newAchievement = await createAchievementRepo(payload, res.locals.jwt);

    const achievementDto = entity2Dto(
      newAchievement
    );
    res.status(201).json(achievementDto);
  } catch (error: any) {
    next(error);
  }
};
