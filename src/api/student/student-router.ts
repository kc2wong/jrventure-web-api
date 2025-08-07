import { Router } from 'express';

import * as controller from '@api/student/student-controller';

const router = Router();

router.get('/', controller.findStudentApi);
router.get('/:id', controller.getStudentByIdApi);
router.get('/:id/activities', controller.getStudentActivityApi);
router.get(
  '/:id/activities/:activityId/achievements',
  controller.getStudentAchievementByActivityIdApi
);

export default router;
