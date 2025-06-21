import { Router } from 'express';
import * as controller from '@api/user/user-controller';

const router = Router();

router.get('/', controller.findUserApi);
router.post('/', controller.createUserApi);
router.get('/:id', controller.getUserByIdApi);
router.put('/:id', controller.updateUserApi);

export default router;
