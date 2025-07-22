import { Rank } from "../entities"

export class UserRankDto {
  public id!: string
  public username!: string
  public points!: {
    rank: Rank
    value: number
    previousValue: number
    previousRank: Rank
  }
  public games!: {
    total: number
    wins: number
    loses: number
  }
}
