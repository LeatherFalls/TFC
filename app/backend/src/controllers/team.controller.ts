import { RequestHandler } from 'express';
import TeamService from '../services/team.service';
import 'express-async-errors';

class TeamController {
  constructor(private teamService: TeamService) {}

  public getAllTeams: RequestHandler = async (_req, res) => {
    const teams = await this.teamService.getAllTeams();

    return res.status(200).json(teams);
  };

  public getTeamsById: RequestHandler = async (req, res) => {
    const { id } = req.params;

    const team = await this.teamService.getTeamsById(Number(id));

    if (!team) return res.status(404).json({ message: 'Team not found' });

    return res.status(200).json(team);
  };
}

export default TeamController;
