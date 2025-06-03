import { Router } from 'express';
import { generatePresignedUrl } from '../controller/meida/presigned-url-post';

const router = Router();

router.post('/presigned-urls', generatePresignedUrl);

export default router;
