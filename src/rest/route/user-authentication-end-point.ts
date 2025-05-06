import { Router } from 'express';
import { userAuthenticationPost } from '../controller/authentication/user-authentication-controller';

const router = Router();

router.post('/', userAuthenticationPost);

export default router;
