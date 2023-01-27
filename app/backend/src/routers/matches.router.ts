import { Router } from 'express';
import { MatchService } from '../services';
import { MatchController } from '../controllers';

const matchService = new MatchService();
const matchController = new MatchController(matchService);

const matchesRouter = Router();

matchesRouter.get('/', matchController.getAll);
matchesRouter.get('/:id', matchController.findById);

export default matchesRouter;
