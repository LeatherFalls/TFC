import Teams from '../database/models/Teams';

class TeamService {
  public getAllTeams = async (): Promise<Teams[]> => {
    const teams = await Teams.findAll({
      raw: true,
    });

    return teams;
  };

  public getTeamsById = async (id: number): Promise<Teams | null> => {
    const team = await Teams.findByPk(id);

    return team;
  };
}

export default TeamService;
