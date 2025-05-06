import { Router } from 'express';
import { registerUser } from '../controller/user-registration/user-registration-post';

const router = Router();

router.post('/', registerUser);

export default router;
