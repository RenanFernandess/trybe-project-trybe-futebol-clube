import { Request, Response } from 'express';
import { TeamService } from '../services';

export default class TeamController {
  constructor(private _TeamService: TeamService) {}

  public getAll = async (_req: Request, res: Response) => {
    try {
      const teams = await this._TeamService.getAll();
      return res.status(200).json(teams);
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  public findById = async ({ params: { id } }: Request, res: Response) => {
    try {
      const teams = await this._TeamService.findById(id);
      return res.status(200).json(teams);
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };
}
