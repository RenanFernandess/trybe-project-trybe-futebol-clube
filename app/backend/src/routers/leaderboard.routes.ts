import { Router } from 'express';
import { LeaderboardService } from '../services';
import { LeaderboardController } from '../controllers';
import { TeamModel } from '../models';

const teamModel = new TeamModel();
const leaderboardService = new LeaderboardService(teamModel);
const leaderboardController = new LeaderboardController(leaderboardService);

const leaderboardRouter = Router();

leaderboardRouter.get('/', leaderboardController.findAll);
leaderboardRouter.get('/home', leaderboardController.findAll);
leaderboardRouter.get('/away', leaderboardController.findAll);

export default leaderboardRouter;
