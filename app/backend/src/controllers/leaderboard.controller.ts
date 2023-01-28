import { Request, Response } from 'express';
import { LeaderboardService } from '../services';

export default class LeaderboardController {
  constructor(private _LeaderboardService: LeaderboardService) {}

  public findAll = async ({ route: { path } }: Request, res: Response) => {
    const leaderboard = await this._LeaderboardService.findAll(path);
    res.status(200).json(leaderboard);
  };
}
