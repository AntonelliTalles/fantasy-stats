export type LeagueModality = 'NFL' | 'NBA' | 'MLB'

export interface LeaguePlayerRef {
  _id: string
  name: string
}

export interface League {
  _id: string
  name: string
  leagueType: LeagueModality
  teamCount: number
  platform: string
  year: number
  champion?: LeaguePlayerRef | null
  runnerUp?: LeaguePlayerRef | null
  thirdPlace?: LeaguePlayerRef | null
  players?: LeaguePlayerRef[]
}
