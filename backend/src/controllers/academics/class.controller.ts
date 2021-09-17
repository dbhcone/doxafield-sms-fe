import { Request, Response } from 'express';
import Class from '../../models/academics/class.model';
import { classValidation } from '../../validators/academics.validations';

// create
const create = async (req: Request, res: Response) => {
  const data = req.body;
  try {
    const validation = await classValidation.validateAsync(data);

    const _class = await new Class(data).save();
    if (_class) {
      return res.status(200).json({
        status: 'ok',
        message: 'class added successfully',
        code: 200,
        data: _class,
      });
    }
    return res.status(404).json({
      status: 'error',
      message: 'could not add class',
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
    const classs = await Class.find().sort({ fullName: 'asc' });
    return res.status(200).json({
      status: 'ok',
      message: 'classes fetched successfully',
      code: 200,
      data: classs,
    });
  } catch (error: any) {
    return res
      .status(404)
      .json({ status: 'error', message: error.message, code: 404 });
  }
};

const readOne = async (req: Request, res: Response) => {
  const id = req.params.classId;
  if (!id) {
    return res.status(404).json({
      status: 'error',
      message: 'Class Id is required for this operation',
      code: 404,
    });
  }
  try {
    const _class = await Class.findById(id);
    if (!_class) {
      return res
        .status(404)
        .json({ status: 'error', message: 'Could not find class', code: 404 });
    }
    return res.status(200).json({
      status: 'ok',
      message: 'class fetched successfully',
      code: 200,
      data: _class,
    });
  } catch (error: any) {
    return res
      .status(404)
      .json({ status: 'error', message: error.message, code: 404 });
  }
};

// update
const update = async (req: Request, res: Response) => {
  const _id = req.params.classId;
  try {
    if (!_id) {
      return res
        .status(400)
        .json({ status: 'error', message: 'Class Id is required', code: 400 });
    }
    const data = req.body;

    const _class = await Class.findByIdAndUpdate(
      _id,
      { $set: { ...data } },
      { new: true }
    );

    if (_class) {
      return res.status(200).json({
        status: 'ok',
        message: 'Class updated successfully',
        code: 200,
        data: _class,
      });
    } else {
      return res.status(404).json({
        status: 'error',
        message: 'Could not find _class to be updated',
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
  const _id = req.params.classId;
  try {
    if (!_id) {
      return res
        .status(400)
        .json({ status: 'error', message: 'Class Id is required', code: 400 });
    }

    const _class = await Class.findByIdAndDelete(_id, { new: true });

    if (_class) {
      return res.status(200).json({
        status: 'ok',
        message: 'Class deleted successfully',
        code: 200,
        data: _class,
      });
    } else {
      return res.status(404).json({
        status: 'error',
        message: 'Could not find class to be deleted',
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
