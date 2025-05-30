import { Router } from 'express';
import { createAchievement } from '../controller/achievement/achievement-post';

const router = Router();

router.post('/', createAchievement);

export default router;
