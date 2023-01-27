import { Request, Response } from 'express';
import { MatchService } from '../services';

export default class MatchController {
  constructor(private _MatchService: MatchService) {}

  public getAll = async ({ query: { inProgress } }: Request, res: Response) => {
    try {
      const query = (typeof inProgress === 'string') ? JSON.parse(inProgress) : undefined;
      console.log(query);
      const matches = await this._MatchService.getAll(query);
      return res.status(200).json(matches);
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  public findById = async ({ params: { id } }: Request, res: Response) => {
    try {
      const match = await this._MatchService.findById(id);
      return res.status(200).json(match);
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };
}
