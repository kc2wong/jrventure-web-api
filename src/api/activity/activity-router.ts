import { Router } from 'express';

import * as controller from '@api/activity/activity-controller';

const router = Router();

router.get('/', controller.findActivityApi);
router.post('/', controller.createActivityApi);
router.get('/:id', controller.getActivityApi);
router.put('/:id', controller.updateActivityApi);

export default router;
