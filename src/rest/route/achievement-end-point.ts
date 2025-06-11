import { Router } from 'express';
import { createAchievement } from '../controller/achievement/achievement-post';
import { findAchievementApproval } from '../controller/achievement/achievement-approval-get';
import { getAchievementById } from '../controller/achievement/achievement-get-by-id';
import { reviewAchievement } from '../controller/achievement/achievement-review-post';

const router = Router();

router.post('/', createAchievement);
router.get('/:id', getAchievementById);
router.post('/:id/review', reviewAchievement);
router.get('/status/pending', findAchievementApproval);

export default router;
