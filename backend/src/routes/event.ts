import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import {
  CreateEvent,
  DeleteEvent,
  FetchAllEvents,
} from '../controllers/event.controller';
import { photograph } from '../validators/shared.validations';
const router = express.Router();

router.post('/create-event', photograph.single('flyer'), CreateEvent);

router.get('/', FetchAllEvents);

router.post('/delete', DeleteEvent);

export { router as eventRouter };
