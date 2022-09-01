import Teams from '../database/models/Teams';
import {
  allVictories,
  allLosses,
  allDraws,
  allOwn,
  allMatches,
  allFavor,
  /* totalVictories,
  totalDraws,
  totalGoalsOwn,
  totalGoalsFavor,
  totalMatches,
  totalLosses */ } from '../utils/leaderboard.utils';
import Matches from '../database/models/Matches';
import TeamService from './team.service';
import MatchService from './matches.service';
import ILeaderboard from '../interfaces/leaderboard.interface';

class LeaderboardService {
  constructor(
    private teamService: TeamService,
    private matchService: MatchService,
  ) {}

  public sort = (teams: ILeaderboard[]) => (
    teams.sort((a, b) => {
      if (a.totalPoints !== b.totalPoints) return b.totalPoints - a.totalPoints;
      if (a.totalVictories !== b.totalVictories) return b.totalVictories - a.totalVictories;
      if (a.goalsBalance !== b.goalsBalance) return b.goalsBalance - a.goalsBalance;
      if (a.goalsFavor !== b.goalsFavor) return b.goalsFavor - a.goalsFavor;
      if (a.goalsOwn !== b.goalsOwn) return b.goalsOwn - a.goalsOwn;
      return 0;
    })
  );

  public leaderboardsAll = async (match: Matches[], teams: Teams[]) =>
    Promise.all(teams.map(async ({ id }) => {
      const team = await this.teamService.getTeamsById(id);
      const totalV = allVictories(match, team?.id);
      const totalD = allDraws(match, team?.id);
      const goalsOwn = allOwn(match, team?.id);
      const goalsFavor = allFavor(match, team?.id);
      const totalGames = allMatches(match, team?.id);

      return { name: team?.teamName,
        totalPoints: (totalV * 3) + totalD,
        totalGames,
        totalVictories: totalV,
        totalDraws: totalD,
        totalLosses: allLosses(match, team?.id),
        goalsFavor,
        goalsOwn,
        goalsBalance: goalsFavor - goalsOwn,
        efficiency: +(((((totalV * 3) + totalD) / (totalGames * 3)) * 100).toFixed(2)),
      };
    }));

  /* public leanderboards = async (matches: Matches[], teams: Teams[], filter: string | null) =>
    Promise.all(teams.map(async ({ id }) => {
      const team = await this.teamService.getTeamsById(id);
      const totalV = totalVictories(matches, filter, id);
      const totalD = totalDraws(matches, team?.id, filter);
      const goalsOwn = totalGoalsOwn(matches, team?.id, filter);
      const goalsFavor = totalGoalsFavor(matches, team?.id, filter);
      const totalGames = totalMatches(matches, team?.id, filter);

      return { name: team?.teamName,
        totalGames,
        totalVictories: totalV,
        totalDraws: totalD,
        totalLosses: totalLosses(matches, team?.id, filter),
        goalsOwn,
        goalsFavor,
        totalPoints: (totalV * 3) + totalD,
        goalsBalance: goalsFavor - goalsOwn,
        efficiency: +(((((totalV * 3) + totalD) / (totalGames * 3)) * 100).toFixed(2)),
      };
    })); */

  public getAll = async () => {
    const matches = await this.matchService.filterByInProgress(false);

    const teams = await this.teamService.getAllTeams();

    const leaderboard = await this.leaderboardsAll(matches, teams);

    return this.sort(leaderboard);
  };
}

export default LeaderboardService;
