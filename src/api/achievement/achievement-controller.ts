import { Request, Response, NextFunction } from 'express';
import {
  ApproveAchievement201ResponseDto,
  ApproveAchievementPathDto,
  CreateAchievement201ResponseDto,
  CreateAchievementRequestDto,
  FindPendingAchievement200ResponseDto,
  FindPendingAchievementQueryDto,
  GetAchievementById200ResponseDto,
  GetAchievementByIdPathDto,
  RejectAchievement201ResponseDto,
  RejectAchievementBodyDto,
  RejectAchievementPathDto,
  ReviewAchievement201ResponseDto,
  ReviewAchievementBodyDto,
  ReviewAchievementPathDto,
} from '@api/achievement/achievement-schema';
import { createAchievementService } from '@service/achievement/create-achievement';
import { getAchievementByIdService } from '@service/achievement/get-achievement';
import { findPendingAchievementService } from '@service/achievement/find-pending-achievement';
import { reviewAchievementService } from '@service/achievement/review-achievement';
import { rejectAchievementService } from '@service/achievement/reject-achievement';
import { approveAchievementService } from '@service/achievement/approve-achievement';

export const createAchievementApi = async (
  req: Request<{}, {}, CreateAchievementRequestDto>,
  res: Response<CreateAchievement201ResponseDto>,
  next: NextFunction
) => {
  try {
    const jwt = res.locals.jwt;
    const newAchievement = await createAchievementService(jwt, req.body);
    res.status(201).json(newAchievement);
  } catch (error: any) {
    next(error);
  }
};

export const getAchievementApi = async (
  req: Request<GetAchievementByIdPathDto>,
  res: Response<GetAchievementById200ResponseDto>,
  next: NextFunction
) => {
  try {
    const jwt = res.locals.jwt;
    const achievement = await getAchievementByIdService(jwt, req.params.id);
    res.status(200).json(achievement);
  } catch (error: any) {
    next(error);
  }
};

export const findPendingAchievementApi = async (
  req: Request<{}, {}, {}, FindPendingAchievementQueryDto>,
  res: Response<FindPendingAchievement200ResponseDto>,
  next: NextFunction
) => {
  try {
    const jwt = res.locals.jwt;
    const achievement = await findPendingAchievementService(jwt, req.query);
    res.status(200).json(achievement);
  } catch (error: any) {
    next(error);
  }
};

export const reviewPendingAchievementApi = async (
  req: Request<ReviewAchievementPathDto, {}, ReviewAchievementBodyDto>,
  res: Response<ReviewAchievement201ResponseDto>,
  next: NextFunction
) => {
  try {
    const jwt = res.locals.jwt;
    const achievement = await reviewAchievementService(
      jwt,
      req.params.id,
      req.body.comment
    );
    res.status(201).json(achievement);
  } catch (error: any) {
    next(error);
  }
};

export const rejectPendingAchievementApi = async (
  req: Request<RejectAchievementPathDto, {}, RejectAchievementBodyDto>,
  res: Response<RejectAchievement201ResponseDto>,
  next: NextFunction
) => {
  try {
    const jwt = res.locals.jwt;
    const achievement = await rejectAchievementService(
      jwt,
      req.params.id,
      req.body.comment
    );
    res.status(201).json(achievement);
  } catch (error: any) {
    next(error);
  }
};

export const approvePendingAchievementApi = async (
  req: Request<ApproveAchievementPathDto>,
  res: Response<ApproveAchievement201ResponseDto>,
  next: NextFunction
) => {
  try {
    const jwt = res.locals.jwt;
    const achievement = await approveAchievementService(jwt, req.params.id);
    res.status(201).json(achievement);
  } catch (error: any) {
    next(error);
  }
};
