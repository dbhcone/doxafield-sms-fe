import { NextFunction, Request, Response } from 'express';
import Users from '../models/user.model';
import { mongoidValidation } from '../validators/shared.validations';
// import config from 'config';
// import fs from 'fs';

// import { Dropbox, files } from 'dropbox';

const GetUserDetails = async (req: Request, res: Response) => {
  const data = req.body;

  try {
    const validation = await mongoidValidation.validateAsync(data);

    const user = await Users.findOne({ _id: data._id });

    /**
     * TODO: return user data except password
     */

    return res.status(200).json({
      status: 'ok',
      message: 'User data fetched successfully',
      data: user,
      profilePhoto: user?.profilePhoto,
    });
  } catch (error: any) {
    return res
      .status(404)
      .json({ error: error.message, code: 404, status: 'error' });
  }
};

const UploadProfilePhoto = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const validation = await mongoidValidation.validateAsync(req.body);

    if (!req.file) {
      console.log('no file at the moment');
      return res.status(400).json({
        message: 'Select a file to be uploaded',
        status: 'error',
        code: 400,
      });
    } else {
      const { buffer, ...fileOtherDetails } = req.file;
      console.log('we have a file excl. buffer', fileOtherDetails);

      // find the accoun

      const updateProfile = await Users.findByIdAndUpdate(req.body._id, {
        $set: { profilePhoto: { ...fileOtherDetails } },
      });

      if (!updateProfile) {
        return res.status(404).json({
          message: 'Could not find user to update',
          status: 'error',
          code: 404,
        });
      }

      return res.status(200).json({
        data: updateProfile,
        status: 'ok',
        code: 200,
        message: 'Profile photo updated successfully',
      });
    }
  } catch (error: any) {
    return res
      .status(404)
      .json({ status: 'error', message: error.message, code: 404 });
  }
};

export { GetUserDetails, UploadProfilePhoto };
