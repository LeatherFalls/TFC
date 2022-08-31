import Teams from '../database/models/Teams';
import Matches from '../database/models/Matches';
import NotFoundError from '../errors/notFound.error';

class MatchService {
  public getAllMatches = async (): Promise<Matches[]> => {
    const matches = await Matches.findAll({
      include: [{
        model: Teams,
        as: 'teamHome',
        attributes: ['teamName'],
      }, {
        model: Teams,
        as: 'teamAway',
        attributes: ['teamName'],
      }],
    });

    return matches;
  };

  public getById = async (id: number): Promise<Matches | null> => {
    const match = await Matches.findByPk(id);

    return match;
  };

  public createMatch = async (match: Matches): Promise<Matches> => {
    const data = {
      ...match,
      inProgress: true,
    };
    const newMatch = await Matches.create(data);

    return newMatch;
  };

  public isFinished = async (id: number) => {
    const match = await Matches.update(
      { inProgress: false },
      { where: { id } },
    );

    return match;
  };

  public updateMatch = async (id: number, homeTeamGoals: number, awayTeamGoals: number) => {
    const match = await this.getById(id);

    if (!match) throw new NotFoundError('There is no match with such id!');

    await Matches.update({
      homeTeamGoals,
      awayTeamGoals,
    }, { where: { id } });
  };
}

export default MatchService;
