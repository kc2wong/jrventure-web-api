import { Router } from 'express';
import * as controller from '@api/achievement/achievement-controller';

const router = Router();

router.post('/', controller.createAchievementApi);
router.post('/status/pending', controller.findPendingAchievementApi);
router.get('/:id', controller.getAchievementApi);
router.get('/:id/review', controller.reviewPendingAchievementApi);
router.get('/:id/rejection', controller.rejectPendingAchievementApi);
router.get('/:id/approval', controller.approvePendingAchievementApi);

export default router;
