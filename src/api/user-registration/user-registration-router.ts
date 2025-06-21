import { Router } from 'express';
import * as controller from '@api/user-registration/user-registration-controller';

const router = Router();

router.post('/', controller.registerUserApi);

export default router;
