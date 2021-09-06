import { NextFunction, Request, Response } from 'express';
import { createEventValidation } from '../validators/event.validations';
import Events from '../models/event.model';
import config from 'config';
import { mongoidValidation } from '../validators/shared.validations';
import { deletePhoto } from '../helpers/functions/fs.helpers';

const CreateEvent = async (req: Request, res: Response, next: NextFunction) => {
  const data = req.body;
  console.log('Data received at backend', data);

  if (!req.body.eventData) {
    return res
      .status(404)
      .json({ message: 'provide event data', status: 'error', code: 404 });
  }

  try {
    let { eventData } = data;
    eventData = JSON.parse(eventData);

    const validation = await createEventValidation.validateAsync(eventData);

    if (!req.file) {
      console.log('no file at the moment');
      return res.status(400).json({
        message: 'Select a file to be uploaded as a flyer',
        status: 'error',
        code: 400,
      });
    }

    const { mimetype, filename, size } = req.file;
    console.log('we have a file excl. buffer', mimetype, filename, size);

    const event = await new Events({
      ...eventData,
      flyer: { mimetype, filename, size },
    }).save();

    if (event) {
      return res.status(201).json({
        message: 'Event created successfully',
        code: 201,
        status: 'ok',
        data: event,
      });
    } else {
      return res
        .status(404)
        .json({ message: 'Event creation failed', code: 404, status: 'error' });
    }
  } catch (error) {
    return res
      .status(404)
      .json({ message: error.message, code: 404, status: 'error' });
  }
};

const FetchAllEvents = async (req: Request, res: Response) => {
  try {
    const events = await Events.find().sort({ title: 'asc' });
    const uploadPath = `${config.get('APPROOT')}/public/uploads`;
    return res.status(200).json({message: 'Events fetched successfully', status: 'ok', code: 200, data: {count: events.length, events, uploadPath}})
  } catch (error) {
    return res
      .status(404)
      .json({ message: error.message, code: 404, status: 'error' });
  }
};

const DeleteEvent = async (req: Request, res: Response) => {
  try {
    const validation = await mongoidValidation.validateAsync(req.body);

    // first delete the document from the collection
    const deleteEvent = await Events.findByIdAndDelete(req.body._id);

    // then now unlink the corresponding file
    if (deleteEvent) {
      deletePhoto(deleteEvent.flyer?.filename)
    }

    return res.sendStatus(200);

  } catch (error) {
    return res.status(404).json({message: error.message, code: 404, status: 'error'})
  }
}

const UpdateEvent = async () => {};

export { CreateEvent, UpdateEvent, FetchAllEvents, DeleteEvent };
