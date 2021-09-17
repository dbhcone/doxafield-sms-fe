import { Request, Response } from 'express';
import Subject from '../../models/academics/subject.model';
import { subjectValidation } from '../../validators/academics.validations';

// create
const create = async (req: Request, res: Response) => {
  const data = req.body;
  try {
    const validation = await subjectValidation.validateAsync(data);

    const subject = await new Subject(data).save();
    if (subject) {
      return res.status(200).json({
        status: 'ok',
        message: 'subject added successfully',
        code: 200,
        data: subject,
      });
    }
    return res.status(404).json({
      status: 'error',
      message: 'could not add subject',
      code: 404,
    });
  } catch (error: any) {
    return res
      .status(404)
      .json({ status: 'error', message: error.message, code: 404 });
  }
};

// read
const read = async (_req: Request, res: Response) => {
  try {
    const subjects = await Subject.find().sort({ fullName: 'asc' });
    return res.status(200).json({
      status: 'ok',
      message: 'subjects fetched successfully',
      code: 200,
      data: subjects,
    });
  } catch (error: any) {
    return res
      .status(404)
      .json({ status: 'error', message: error.message, code: 404 });
  }
};

const readOne = async (req: Request, res: Response) => {
  const id = req.params.subjectId;
  if (!id) {
    return res.status(404).json({
      status: 'error',
      message: 'Subject Id is required for this operation',
      code: 404,
    });
  }
  try {
    const subject = await Subject.findById(id);
    if (!subject) {
      return res
        .status(404)
        .json({ status: 'error', message: 'Could not find subject', code: 404 });
    }
    return res.status(200).json({
      status: 'ok',
      message: 'subject fetched successfully',
      code: 200,
      data: subject,
    });
  } catch (error: any) {
    return res
      .status(404)
      .json({ status: 'error', message: error.message, code: 404 });
  }
};

// update
const update = async (req: Request, res: Response) => {
  const _id = req.params.subjectId;
  try {
    if (!_id) {
      return res
        .status(400)
        .json({ status: 'error', message: 'Subject Id is required', code: 400 });
    }
    const data = req.body;

    const subject = await Subject.findByIdAndUpdate(
      _id,
      { $set: { ...data } },
      { new: true }
    );

    if (subject) {
      return res.status(200).json({
        status: 'ok',
        message: 'Subject updated successfully',
        code: 200,
        data: subject,
      });
    } else {
      return res.status(404).json({
        status: 'error',
        message: 'Could not find subject to be updated',
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
  const _id = req.params.subjectId;
  try {
    if (!_id) {
      return res
        .status(400)
        .json({ status: 'error', message: 'Subject Id is required', code: 400 });
    }

    const subject = await Subject.findByIdAndDelete(_id, { new: true });

    if (subject) {
      return res.status(200).json({
        status: 'ok',
        message: 'Subject deleted successfully',
        code: 200,
        data: subject,
      });
    } else {
      return res.status(404).json({
        status: 'error',
        message: 'Could not find subject to be deleted',
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
