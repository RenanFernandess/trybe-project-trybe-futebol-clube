import { Request, Response } from 'express';
import { SERVER_ERROR } from '../errors/messages';
import HttpError from '../errors';
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
      return res.status(500).json({ message: SERVER_ERROR });
    }
  };

  public findById = async ({ params: { id } }: Request, res: Response) => {
    try {
      const match = await this._MatchService.findById(id);
      return res.status(200).json(match);
    } catch (error) {
      return res.status(500).json({ message: SERVER_ERROR });
    }
  };

  public create = async ({ body }: Request, res: Response) => {
    try {
      const match = await this._MatchService.create(body);
      res.status(201).json(match);
    } catch (error) {
      if (error instanceof HttpError) {
        const { status, message } = error;
        return res.status(status).json({ message });
      }
      return res.status(500).json({ message: SERVER_ERROR });
    }
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
