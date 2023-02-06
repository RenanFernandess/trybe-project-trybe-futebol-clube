import { Router } from 'express';
import { TeamService } from '../services';
import { TeamController } from '../controllers';

const teamService = new TeamService();
const teamController = new TeamController(teamService);

const teamsRouter = Router();

teamsRouter.get('/', teamController.getAll);
teamsRouter.get('/:id', teamController.findById);

export default teamsRouter;
