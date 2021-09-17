import { Request, Response } from 'express';
import Admission from '../../models/admissions/pupil.admission.model';
import { admissionValidation } from '../../validators/admissions.validations';

// create
const create = async (req: Request, res: Response) => {
  const data = req.body;
  try {
    // const validation = await admissionValidation.validateAsync(data);

    // first find a admission with year and term
    
    const admission = await new Admission(data).save();
    if (admission) {
      return res.status(200).json({
        status: 'ok',
        message: 'admission added successfully',
        code: 200,
        data: admission,
      });
    } else {
      return res.status(404).json({
        status: 'error',
        message: 'could not add admission',
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
    const admissions = await Admission.find();
    return res.status(200).json({
      status: 'ok',
      message: 'admissions fetched successfully',
      code: 200,
      data: admissions,
    });
  } catch (error: any) {
    return res
      .status(404)
      .json({ status: 'error', message: error.message, code: 404 });
  }
};

const readOne = async (req: Request, res: Response) => {
  const id = req.params.admissionId;
  if (!id) {
    return res
      .status(404)
      .json({
        status: 'error',
        message: 'Admission Id is required for this operation',
        code: 404,
      });
  }
  try {
    const admission = await Admission.findById(id);
    if (!admission) {
      return res
        .status(404)
        .json({
          status: 'error',
          message: 'Could not find admission',
          code: 404,
        });
    }
    return res.status(200).json({
      status: 'ok',
      message: 'admission fetched successfully',
      code: 200,
      data: admission,
    });
  } catch (error: any) {
    return res
      .status(404)
      .json({ status: 'error', message: error.message, code: 404 });
  }
};

// update
const update = async (req: Request, res: Response) => {
  const _id = req.params.admissionId;
  try {
    if (!_id) {
      return res
        .status(400)
        .json({
          status: 'error',
          message: 'Admission Id is required',
          code: 400,
        });
    }
    const data = req.body;

    const admission = await Admission.findByIdAndUpdate(
      _id,
      { $set: { ...data } },
      { new: true }
    );

    if (admission) {
      return res
        .status(200)
        .json({
          status: 'ok',
          message: 'Admission updated successfully',
          code: 200,
          data: admission,
        });
    } else {
      return res
        .status(404)
        .json({
          status: 'error',
          message: 'Could not find admission to be updated',
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
  const _id = req.params.admissionId;
  try {
    if (!_id) {
      return res
        .status(400)
        .json({
          status: 'error',
          message: 'Admission Id is required',
          code: 400,
        });
    }

    const admission = await Admission.findByIdAndDelete(_id, { new: true });

    if (admission) {
      return res
        .status(200)
        .json({
          status: 'ok',
          message: 'Admission deleted successfully',
          code: 200,
          data: admission,
        });
    } else {
      return res
        .status(404)
        .json({
          status: 'error',
          message: 'Could not find admission to be deleted',
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
