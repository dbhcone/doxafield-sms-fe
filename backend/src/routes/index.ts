import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import { ContactUs } from '../controllers/index.controller';
const router = express.Router();

/* GET home page. */
router.get('/test', function (req: Request, res: Response, next: NextFunction) {
  res
    .status(200)
    .json({
      message: 'Testing endpoint hit successfully',
      status: 'ok',
      code: 200,
    });
});

router.post('/contactus', ContactUs)

export { router as indexRouter };
