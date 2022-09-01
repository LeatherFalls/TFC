import { RequestHandler } from 'express';
import LeaderboardService from '../services/leaderboard.service';

class LeaderboardController {
  constructor(private leaderboardService: LeaderboardService) {}

  public getAll: RequestHandler = async (req, res) => {
    const leaderboard = await this.leaderboardService.getAll();

    res.status(200).json(leaderboard);
  };
}

export default LeaderboardController;
