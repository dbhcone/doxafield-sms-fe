import express from 'express';
import { create, read, readOne, update, _delete } from '../controllers/admissions/pupil.controller';
import { photograph } from '../validators/shared.validations';
const router = express.Router();

// Admission
router.get('/admissions', read );
router.get('/admission/:admissionId', readOne);
router.patch('/admission/:admissionId', update);
router.post('/admission', photograph.single('photo'), create);
router.delete('/admission/:admissionId', _delete);

export { router as admissionsRouter };
