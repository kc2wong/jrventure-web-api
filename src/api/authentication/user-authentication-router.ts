import { Router } from 'express';
import { userAuthenticationApi } from '@api/authentication/user-authentication-controller';

const router = Router();

router.post('/', userAuthenticationApi);

export default router;
