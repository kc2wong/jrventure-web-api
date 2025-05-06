import { Router } from 'express';
import { googleAuthenticationPost } from '../controller/authentication/google-authentication-controller';

const router = Router();

router.post('/', googleAuthenticationPost);

export default router;
