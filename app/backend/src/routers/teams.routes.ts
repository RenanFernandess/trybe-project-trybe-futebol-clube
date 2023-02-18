import { Router } from 'express';
import { TeamService } from '../services';
import { TeamController } from '../controllers';
import { TeamModel } from '../models';

const teamModel = new TeamModel();
const teamService = new TeamService(teamModel);
const teamController = new TeamController(teamService);

const teamsRouter = Router();

teamsRouter.get('/', teamController.getAll);
teamsRouter.get('/:id', teamController.findById);

export default teamsRouter;
