import { Router } from 'express';

import * as controller from '@api/media/media-controller';

const router = Router();

router.post('/presigned-urls', controller.generatePresignedUrlApi);

export default router;
