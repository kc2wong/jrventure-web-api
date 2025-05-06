import { Router } from 'express';
import { findStudent } from '../controller/student/find-student-controller';
import { getStudentById } from '../controller/student/get-student-id';

const router = Router();

router.get('/', findStudent);
router.get('/:id', getStudentById);

export default router;
