import { Router } from 'express';

import { googleAuthenticationApi } from '@api/authentication/google-authentication-controller';

const router = Router();

router.post('/', googleAuthenticationApi);

export default router;
