import { Router } from 'express';
import loginValidate, { tokenValidate } from '../middlewares';
import LoginService from '../services';
import LoginController from '../controllers';
import Token from '../auth';

const token = new Token();
const loginService = new LoginService(token);
const loginController = new LoginController(loginService);

const loginRouter = Router();

loginRouter.post('/', loginValidate, loginController.login);
loginRouter.get('/validate', tokenValidate, loginController.validate);

export default loginRouter;
