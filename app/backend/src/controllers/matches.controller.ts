import { RequestHandler } from 'express';
import MatchService from '../services/matches.service';
import TeamService from '../services/team.service';

class MatchController {
  constructor(
    private matchService: MatchService,
    private teamsService: TeamService,
  ) {}

  public getAllMatches: RequestHandler = async (_req, res) => {
    const matches = await this.matchService.getAllMatches();

    return res.status(200).json(matches);
  };

  public createMatch: RequestHandler = async (req, res) => {
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
