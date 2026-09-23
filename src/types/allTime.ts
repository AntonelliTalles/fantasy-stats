export type LeagueType = "NFL" | "NBA" | "MLB";

export type AllTimeSortKey =
  | "totalWins"
  | "winPercentage"
  | "championships"
  | "playoffsWins"
  | "playoffAppearances"
  | "pointsScored"
  | "pointsConceded"
  | "pointDifference"
  | "seasons";

export interface AllTimePlayer {
  position: number;

  player: {
    _id: string;
    name: string;
  };

  seasons: number;

  regularWins: number;
  regularLosses: number;
  regularTies: number;

  playoffAppearances: number;
  playoffsWins: number;
  playoffsLosses: number;

  totalWins: number;
  totalLosses: number;
  totalGames: number;

  pointsScored: number;
  pointsConceded: number;
  pointDifference: number;

  championships: number;
  runnerUps: number;
  thirdPlaces: number;

  winPercentage: number;
  regularWinPercentage: number;
  playoffWinPercentage: number;
}

export interface AllTimeResponse {
  filter: {
    leagueType: LeagueType | "ALL";
  };

  totalPlayers: number;
  totalLeagues: number;
  totalHistoryRecords: number;

  ranking: AllTimePlayer[];
}