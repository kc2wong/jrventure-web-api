import { Router } from 'express';
import { findStudent } from '../controller/student/find-student-controller';
import { getStudentById } from '../controller/student/get-student-id';
import { findActivityByStudentId } from '../controller/activity/activity-get-by-student-id';
import { findAchievementByStudentActivityId } from '../controller/achievement/achievement-get-by-student-activity-id';

const router = Router();

router.get('/', findStudent);
router.get('/:id', getStudentById);
router.get('/:id/activities', findActivityByStudentId);
router.get(
  '/:id/activities/:activityId/achievements',
  findAchievementByStudentActivityId
);

export default router;
