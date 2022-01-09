import { Request, Response } from 'express';
import { decodeToken, generateToken } from '../helpers/functions/auth.helpers';
import { IAccount } from '../interfaces/account.interface';
import { IUser } from '../interfaces/user.interface';
import Users from '../models/user.model';
import Activations from '../models/user.activations.model';

// import validations
import {
  userValidation,
  loginValidation,
  accountUpdateValidation,
  accountActivationValidation,
} from '../validators/auth.validations';
import md5 from 'md5';

const Signup = async (req: Request, res: Response) => {
  const data = req.body;

  try {
    let validation = await userValidation.validateAsync(data);

    const hashPassword = md5(data.password);

    const newUser = await new Users({ ...data, password: hashPassword }).save();

    // TODO: for later purposes, send email to user with his email and password
  } catch (error: any) {
    return res
      .status(404)
      .json({ code: 404, status: 'error', message: error.message });
  }
};

const Login = async (req: Request, res: Response) => {
  let { username, password, isAdmin } = req.body;

  try {
    const validation = await loginValidation.validateAsync(req.body);
    const role = isAdmin ? 'admin' : 'member';
    const user = await Users.findOne({ username, password, role });

    if (!user) {
      return res
        .status(403)
        .json({ code: 403, message: 'Invalid credentials', status: 'error' });
    }

    // check if user has activated account already
    if (user.status != 'active') {
      return res.status(403).json({
        code: 403,
        message: 'Account has not been activated. Request one now!',
        status: 'error',
      });
    }

    let token = generateToken(
      {
        username: user.username,
        role: user.role,
        id: user._id,
        email: user.email,
      },
      '6h'
    );

    return res
      .status(200)
      .json({ message: 'Login successful!', token, code: 200, status: 'ok' });
  } catch (error: any) {
    console.log('logging in', error.message);
    return res
      .status(404)
      .send({ code: 404, status: 'error', message: error.message });
  }
};

const UsersList = async (req: Request, res: Response) => {
  try {
    let data = await Users.find({}).select({ password: 0 });
    return res.status(200).json({
      code: 200,
      message: 'Members list fetched successfully',
      status: 'ok',
      data,
    });
  } catch (error: any) {
    console.log('Error fetching members list', error.message);
    return res
      .status(404)
      .json({ code: 404, message: error.message, status: 'error' });
  }
};

export { Signup, Login, UsersList };
