import { Router } from 'express';
import { listActivityCategory } from '../controller/activity-category/list-activity-category';

const router = Router();

router.get('/', listActivityCategory);

export default router;
