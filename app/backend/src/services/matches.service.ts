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
}

export default MatchService;
