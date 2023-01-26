import { Router } from 'express';
import { tokenValidate } from '../middlewares';

const teamsRouter = Router();

teamsRouter.get('/', tokenValidate);

export default teamsRouter;
