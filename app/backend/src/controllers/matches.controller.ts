import { RequestHandler } from 'express';
import MatchService from '../services/matches.service';
import LoginService from '../services/login.service';

class MatchController {
  constructor(
    private matchService: MatchService,
    private loginService: LoginService,
  ) {}

  public getAllMatches: RequestHandler = async (_req, res) => {
    const matches = await this.matchService.getAllMatches();

    return res.status(200).json(matches);
  };

  public createMatch: RequestHandler = async (req, res, next) => {
    try {
      const token = req.headers.authorization as string;

      if (!token) return res.status(401).json({ message: 'Token must be a valid token' });

      await this.loginService.verifyToken(token);

      const match = await this.matchService.createMatch(req.body);

      return res.status(201).json(match);
    } catch (error) {
      next(error);
    }
  };

  public isFinished: RequestHandler = async (req, res) => {
    const { id } = req.params;
    const token = req.headers.authorization as string;

    if (!token) return res.status(401).json({ message: 'Token must be a valid token' });

    await this.loginService.verifyToken(token);

    await this.matchService.isFinished(Number(id));

    return res.status(200).json({ message: 'Finished' });
  };

  public updateMatch: RequestHandler = async (req, res) => {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;

    const match = await this.matchService.getById(Number(id));

    if (!match) return res.status(404).json({ message: 'There is no match with such id!' });

    await this.matchService.updateMatch(Number(id), homeTeamGoals, awayTeamGoals);

    return res.status(200).json({ message: 'Updated' });
  };
}

export default MatchController;
