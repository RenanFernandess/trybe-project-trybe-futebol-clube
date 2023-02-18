import { Router } from 'express';
import { tokenValidate } from '../middlewares';
import { MatchService } from '../services';
import { MatchController } from '../controllers';
import { TeamModel, MatchModel } from '../models';

const teamModel = new TeamModel();
const matchModel = new MatchModel();
const matchService = new MatchService(matchModel, teamModel);
const matchController = new MatchController(matchService);

const matchesRouter = Router();

matchesRouter.get('/', matchController.getAll);
matchesRouter.get('/:id', matchController.findById);
matchesRouter.post('/', tokenValidate, matchController.create);
matchesRouter.patch('/:id/finish', matchController.finish);
matchesRouter.patch('/:id', matchController.updateScore);

export default matchesRouter;
