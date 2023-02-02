import { Request, Response } from 'express';
import { TeamService } from '../services';

export default class TeamController {
  constructor(private _TeamService: TeamService) {}

  public getAll = async (_req: Request, res: Response) => {
    const teams = await this._TeamService.getAll();
    return res.status(200).json(teams);
  };

  public findById = async ({ params: { id } }: Request, res: Response) => {
    const teams = await this._TeamService.findById(id);
    return res.status(200).json(teams);
  };
}
