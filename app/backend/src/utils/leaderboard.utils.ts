import Matches from '../database/models/Matches';

export const totalMatches = (matches: Matches[], filter: string, teamId: number) => {
  let count = 0;

  matches.forEach((match) => {
    if (filter === 'home') {
      count = match.homeTeam === teamId ? count += 1 : count;
    }

    if (filter === 'away') {
      count = match.awayTeam === teamId ? count += 1 : count;
    }
  });

  return count;
};

export const allMatches = (matches: Matches[], teamId: number | undefined): number => {
  let count = 0;

  matches.forEach(({ homeTeam, awayTeam }) => {
    if (homeTeam === teamId) {
      count += 1;
    }
    if (awayTeam === teamId) {
      count += 1;
    }
  });

  return count;
};

export const totalVictories = (matches: Matches[], filter: string | null, teamId: number) => {
  let count = 0;

  matches.forEach(({ homeTeam, homeTeamGoals, awayTeam, awayTeamGoals }) => {
    if (filter === 'home') {
      count = homeTeam === teamId && homeTeamGoals > awayTeamGoals ? count += 1 : count;
    }

    if (filter === 'away') {
      count = awayTeam === teamId && awayTeamGoals > homeTeamGoals ? count += 1 : count;
    }
  });

  return count;
};

export const allVictories = (matches: Matches[], teamId: number | undefined): number => {
  let count = 0;

  matches.forEach(({ homeTeamGoals, awayTeamGoals, homeTeam, awayTeam }) => {
    if (homeTeamGoals > awayTeamGoals && teamId === homeTeam) {
      count += 1;
    }

    if (awayTeamGoals > homeTeamGoals && teamId === awayTeam) {
      count += 1;
    }
  });

  return count;
};

export const totalDraws = (matches: Matches[], filter: string, teamId: number) => {
  let count = 0;

  matches.forEach(({ homeTeam, homeTeamGoals, awayTeam, awayTeamGoals }) => {
    if (filter === 'home') {
      count = homeTeam === teamId && homeTeamGoals === awayTeamGoals ? count += 1 : count;
    }

    if (filter === 'away') {
      count = awayTeam === teamId && awayTeamGoals === homeTeamGoals ? count += 1 : count;
    }
  });

  return count;
};

export const allDraws = (matches: Matches[], teamId: number | undefined): number => {
  let count = 0;

  matches.forEach(({ homeTeamGoals, awayTeamGoals, homeTeam, awayTeam }) => {
    if (homeTeamGoals === awayTeamGoals && teamId === homeTeam) {
      count += 1;
    }

    if (awayTeamGoals === homeTeamGoals && teamId === awayTeam) {
      count += 1;
    }
  });

  return count;
};

export const totalLosses = (matches: Matches[], teamId: number, filter: string | null) => {
  let count = 0;

  matches.forEach(({ homeTeam, homeTeamGoals, awayTeam, awayTeamGoals }) => {
    if (filter === 'home') {
      count = homeTeam === teamId && homeTeamGoals < awayTeamGoals ? count += 1 : count;
    }

    if (filter === 'away') {
      count = awayTeam === teamId && awayTeamGoals < homeTeamGoals ? count += 1 : count;
    }
  });

  return count;
};

export const allLosses = (matches: Matches[], teamId: number | undefined): number => {
  let count = 0;

  matches.forEach(({ homeTeamGoals, awayTeamGoals, homeTeam, awayTeam }) => {
    if (homeTeamGoals < awayTeamGoals && teamId === homeTeam) {
      count += 1;
    }

    if (awayTeamGoals < homeTeamGoals && teamId === awayTeam) {
      count += 1;
    }
  });

  return count;
};

export const totalGoalsFavor = (matches: Matches[], teamId: number) => {
  let goals = 0;

  matches.forEach(({ homeTeam, homeTeamGoals, awayTeam, awayTeamGoals }) => {
    if (homeTeam === teamId) {
      goals += homeTeamGoals;
    }

    if (awayTeam === teamId) {
      goals += awayTeamGoals;
    }
  });

  return goals;
};

export const allFavor = (matches: Matches[], teamId: number | undefined): number => {
  let count = 0;

  matches.forEach(({ homeTeamGoals, awayTeamGoals, homeTeam, awayTeam }) => {
    if (teamId === homeTeam) {
      count += homeTeamGoals;
    } else if (teamId === awayTeam) {
      count += awayTeamGoals;
    }
  });

  return count;
};

export const totalGoalsOwn = (matches: Matches[], teamId: number) => {
  let goals = 0;

  matches.forEach(({ homeTeam, homeTeamGoals, awayTeam, awayTeamGoals }) => {
    if (homeTeam === teamId) {
      goals += awayTeamGoals;
    }

    if (awayTeam === teamId) {
      goals += homeTeamGoals;
    }
  });

  return goals;
};

export const allOwn = (matches: Matches[], teamId: number | undefined): number => {
  let count = 0;

  matches.forEach(({ homeTeamGoals, awayTeamGoals, homeTeam, awayTeam }) => {
    if (teamId === homeTeam) {
      count += awayTeamGoals;
    }

    if (teamId === awayTeam) {
      count += homeTeamGoals;
    }
  });

  return count;
};
