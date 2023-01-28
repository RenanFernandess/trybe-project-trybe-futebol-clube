import { Router } from 'express';
import { LeaderboardService } from '../services';
import { LeaderboardController } from '../controllers';

const leaderboardService = new LeaderboardService();
const leaderboardController = new LeaderboardController(leaderboardService);

const leaderboardRouter = Router();

leaderboardRouter.get('/', leaderboardController.findAll);
leaderboardRouter.get('/home', leaderboardController.findAll);
leaderboardRouter.get('/away', leaderboardController.findAll);

export default leaderboardRouter;
