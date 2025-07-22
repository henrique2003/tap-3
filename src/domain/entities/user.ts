import { Rank } from "./rank";

export class User {
  constructor(
    public id: string,
    public username: string,
    public points: {
      rank: Rank;
      value: number;
    },
    public games: {
      total: number;
      wins: number;
      loses: number;
    },
  ) {}
}