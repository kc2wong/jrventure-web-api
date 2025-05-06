import { Router } from 'express';
import { findUser } from '../controller/user/users-get';
import { getUserById } from '../controller/user/users-get-by-id';
import { createUser } from '../controller/user/users-post';
import { updateUser } from '../controller/user/users-put';

const router = Router();

router.get('/', findUser);
router.get('/:id', getUserById);
router.post('/', createUser);
router.put('/:id', updateUser);

export default router;
