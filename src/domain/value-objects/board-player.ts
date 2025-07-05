import { PlayerType } from "../enums";
import { Result } from "../sahred-kernel";

export class BoardPlayer {
  constructor(
    public type: PlayerType,
    public wins: number,
    public color: string,
  ) {}

  static create({
    type,
    color
  } : {
    type: PlayerType
    color: string
  }): Result<BoardPlayer> {
    if (!type) {
      return Result.failure('Player type must be defined');
    }

    if (!color) {
      return Result.failure('Player color must be defined');
    }

    return Result.success(new BoardPlayer(type, 0, color));
  }

  public incrementWins(): Result<void> {
    this.wins++;

    return Result.success();
  }

  public istMe(currentBoardPlayer: BoardPlayer): Result<boolean> {
    return Result.success(this.type === currentBoardPlayer.type);
  }

  public clone(): BoardPlayer {
    return new BoardPlayer(this.type, this.wins, this.color);
  }
}