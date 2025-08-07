import { Router } from 'express';

import { userAuthenticationApi } from '@api/authentication/user-authentication-controller';
import { userAuthenticationRefreshApi } from '@api/authentication/user-authentication-refresh-controller';

const router = Router();

router.post('/', userAuthenticationApi);
router.post('/refresh', userAuthenticationRefreshApi);

export default router;
