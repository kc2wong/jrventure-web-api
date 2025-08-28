import { Router } from 'express';

import * as controller from '@api/circular/circular-controller';

const router = Router();

router.get('/', controller.findCircularApi);
// router.post('/', controller.createActivityApi);
router.get('/:id', controller.getCircularApi);
// router.put('/:id', controller.updateActivityApi);

export default router;
