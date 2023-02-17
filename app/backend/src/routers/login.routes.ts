import { Router } from 'express';
import loginValidate, { tokenValidate } from '../middlewares';
import LoginService from '../services';
import LoginController from '../controllers';
import Token from '../auth';
import UserModel from '../models';

const token = new Token();
const userModel = new UserModel();
const loginService = new LoginService(userModel, token);
const loginController = new LoginController(loginService);

const loginRouter = Router();

loginRouter.post('/', loginValidate, loginController.login);
loginRouter.get('/validate', tokenValidate, loginController.validate);

export default loginRouter;
