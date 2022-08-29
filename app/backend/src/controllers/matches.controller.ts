import { RequestHandler } from 'express';
import MatchService from '../services/matches.service';

class MatchController {
  constructor(private matchService: MatchService) {}

  public getAllMatches: RequestHandler = async (_req, res) => {
    const matches = await this.matchService.getAllMatches();

    return res.status(200).json(matches);
  };

  public createMatch: RequestHandler = async (req, res) => {
    const match = await this.matchService.createMatch(req.body);

    return res.status(201).json(match);
  };

  public isFinished: RequestHandler = async (req, res) => {
    const { id } = req.params;

    await this.matchService.isFinished(Number(id));

    return res.status(200).json({ message: 'Finished' });
  };
}

export default MatchController;
