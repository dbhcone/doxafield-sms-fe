import { Request, Response } from 'express';
import Calendar from '../../models/academics/calendar.model';
import { calendarValidation } from '../../validators/academics.validations';

// create
const create = async (req: Request, res: Response) => {
  const data = req.body;
  try {
    const validation = await calendarValidation.validateAsync(data);

    // first find a calendar with year and term
    const foundCalendar = await Calendar.findOne({
      year: data.year,
      term: data.term,
    });
    if (foundCalendar) {
      return res
        .status(403)
        .json({
          status: 'error',
          message: 'Calendar already exists!',
          code: 403,
        });
    }
    const calendar = await new Calendar(data).save();
    if (calendar) {
      return res.status(200).json({
        status: 'ok',
        message: 'calendar added successfully',
        code: 200,
        data: calendar,
      });
    } else {
      return res.status(404).json({
        status: 'error',
        message: 'could not add calendar',
        code: 404,
      });
    }
  } catch (error: any) {
    return res
      .status(404)
      .json({ status: 'error', message: error.message, code: 404 });
  }
};

// read
const read = async (_req: Request, res: Response) => {
  try {
    const calendars = await Calendar.find().sort({ year: 'desc', term: 'asc' });
    return res.status(200).json({
      status: 'ok',
      message: 'calendars fetched successfully',
      code: 200,
      data: calendars,
    });
  } catch (error: any) {
    return res
      .status(404)
      .json({ status: 'error', message: error.message, code: 404 });
  }
};

const readOne = async (req: Request, res: Response) => {
  const id = req.params.calendarId;
  if (!id) {
    return res
      .status(404)
      .json({
        status: 'error',
        message: 'Calendar Id is required for this operation',
        code: 404,
      });
  }
  try {
    const calendar = await Calendar.findById(id);
    if (!calendar) {
      return res
        .status(404)
        .json({
          status: 'error',
          message: 'Could not find calendar',
          code: 404,
        });
    }
    return res.status(200).json({
      status: 'ok',
      message: 'calendar fetched successfully',
      code: 200,
      data: calendar,
    });
  } catch (error: any) {
    return res
      .status(404)
      .json({ status: 'error', message: error.message, code: 404 });
  }
};

// update
const update = async (req: Request, res: Response) => {
  const _id = req.params.calendarId;
  try {
    if (!_id) {
      return res
        .status(400)
        .json({
          status: 'error',
          message: 'Calendar Id is required',
          code: 400,
        });
    }
    const data = req.body;

    const calendar = await Calendar.findByIdAndUpdate(
      _id,
      { $set: { ...data } },
      { new: true }
    );

    if (calendar) {
      return res
        .status(200)
        .json({
          status: 'ok',
          message: 'Calendar updated successfully',
          code: 200,
          data: calendar,
        });
    } else {
      return res
        .status(404)
        .json({
          status: 'error',
          message: 'Could not find calendar to be updated',
          code: 404,
        });
    }
  } catch (error: any) {
    return res
      .status(404)
      .json({ status: 'error', message: error.message, code: 404 });
  }
};

// delete - expensive delete
const _delete = async (req: Request, res: Response) => {
  const _id = req.params.calendarId;
  try {
    if (!_id) {
      return res
        .status(400)
        .json({
          status: 'error',
          message: 'Calendar Id is required',
          code: 400,
        });
    }

    const calendar = await Calendar.findByIdAndDelete(_id, { new: true });

    if (calendar) {
      return res
        .status(200)
        .json({
          status: 'ok',
          message: 'Calendar deleted successfully',
          code: 200,
          data: calendar,
        });
    } else {
      return res
        .status(404)
        .json({
          status: 'error',
          message: 'Could not find calendar to be deleted',
          code: 404,
        });
    }
  } catch (error: any) {
    return res
      .status(404)
      .json({ status: 'error', message: error.message, code: 404 });
  }
};

export { create, read, readOne, update, _delete };
