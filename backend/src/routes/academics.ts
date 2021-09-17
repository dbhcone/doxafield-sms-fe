import express from 'express';
import { create as calCreate, read as calRead, readOne as calReadOne, update as calUpdate, _delete as calDelete } from '../controllers/academics/calendar.controller';
import { create as clsCreate, read as clsRead, readOne as clsReadOne, update as clsUpdate, _delete as clsDelete } from '../controllers/academics/class.controller';
import { create as subCreate, read as subRead, readOne as subReadOne, update as subUpdate, _delete as subDelete } from '../controllers/academics/subject.controller';
const router = express.Router();

// Calendar
router.get('/calendars', calRead );
router.get('/calendar/:calendarId', calReadOne);
router.patch('/calendar/:calendarId', calUpdate);
router.post('/calendar', calCreate);
router.delete('/calendar/:calendarId', calDelete);

// Subject
router.get('/subjects', subRead );
router.get('/subject/:subjectId', subReadOne);
router.patch('/subject/:subjectId', subUpdate);
router.post('/subject', subCreate);
router.delete('/subject/:subjectId', subDelete);

// Class
router.get('/classes', clsRead );
router.get('/class/:classId', clsReadOne);
router.patch('/class/:classId', clsUpdate);
router.post('/class', clsCreate);
router.delete('/class/:classId', clsDelete);

export { router as academicsRouter };
