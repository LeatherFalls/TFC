import Teams from '../database/models/Teams';
import Matches from '../database/models/Matches';

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
}

export default MatchService;
