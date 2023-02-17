import { Request, Response } from 'express';
import { MatchService } from '../services';

export default class MatchController {
  constructor(private _MatchService: MatchService) {}

  public getAll = async ({ query: { inProgress } }: Request, res: Response) => {
    const query = (typeof inProgress === 'string') ? JSON.parse(inProgress) : undefined;
    const matches = await this._MatchService.getAll(query);
    return res.status(200).json(matches);
  };

  public findById = async ({ params: { id } }: Request, res: Response) => {
    const match = await this._MatchService.findById(id);
    return res.status(200).json(match);
  };

  public create = async ({ body }: Request, res: Response) => {
    const match = await this._MatchService.create(body);
    res.status(201).json(match);
  };

  public finish = async ({ params: { id } }: Request, res: Response) => {
    const message = await this._MatchService.finish(id);
    res.status(200).json({ message });
  };

  public updateScore = async ({ params: { id }, body }: Request, res: Response) => {
    await this._MatchService.updateScore(id, body);
    return res.status(200).json({ ok: 'ok' });
  };
}
