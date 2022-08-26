import { RequestHandler } from 'express';
import MatchService from '../services/matches.service';

class MatchController {
  constructor(private matchService: MatchService) {}

  public getAllMatches: RequestHandler = async (_req, res) => {
    const matches = await this.matchService.getAllMatches();

    return res.status(200).json(matches);
  };
}

export default MatchController;
