import { Router } from 'express';

const leaderboardRouter = Router();

leaderboardRouter.get('/');
leaderboardRouter.get('/home');
leaderboardRouter.get('/away');

export default leaderboardRouter;
