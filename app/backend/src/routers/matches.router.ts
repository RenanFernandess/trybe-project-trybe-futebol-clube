import { Router } from 'express';
import { tokenValidate } from '../middlewares';
import { MatchService } from '../services';
import { MatchController } from '../controllers';

const matchService = new MatchService();
const matchController = new MatchController(matchService);

const matchesRouter = Router();

matchesRouter.get('/', matchController.getAll);
matchesRouter.get('/:id', matchController.findById);
matchesRouter.post('/', tokenValidate, matchController.create);
matchesRouter.patch('/:id/finish', matchController.finish);
matchesRouter.patch('/:id', matchController.updateScore);

export default matchesRouter;
