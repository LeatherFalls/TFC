import { RequestHandler } from 'express';
import TeamsService from '../services/team.service';
import 'express-async-errors';

export default class MatchesMiddleware {
  constructor(private teamsService: TeamsService) {}

  public validation: RequestHandler = async (req, res, next) => {
    const { homeTeam, awayTeam } = req.body;

    const homeTeamId = await this.teamsService.getTeamsById(homeTeam);
    const awayTeamId = await this.teamsService.getTeamsById(awayTeam);

    if (!homeTeamId || !awayTeamId) {
      return res.status(404).json({ message: 'There is no team with such id!' });
    }

    if (homeTeam === awayTeam) {
      return res.status(401).json({
        message: 'It is not possible to create a match with two equal teams',
      });
    }

    next();
  };
}
