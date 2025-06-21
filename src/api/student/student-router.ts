import { Router } from 'express';
import * as controller from '@api/student/student-controller';
import * as achievementController from '@api/achievement/achievement-controller';

const router = Router();

router.get('/', controller.findStudentApi);
router.get('/:id', controller.getStudentByIdApi);
router.get(
  '/:id/activities/:activityId/achievements',
  achievementController.getAchievementApi
);

export default router;
