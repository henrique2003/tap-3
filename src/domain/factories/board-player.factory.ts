import { PlayerType } from "../enums";
import { Result } from "../sahred-kernel";
import { BoardPlayer } from "../value-objects";

export class BoardPlayerFactory {
  static red(): Result<BoardPlayer> {
    const result = BoardPlayer.create({ type: PlayerType.Red, color: 'bg-red-600' })
    if (result.isFailure()) {
      return Result.failure(result.getError());
    }

    return Result.success(result.getValue());
  }

  static yellow(): Result<BoardPlayer> {
    const result = BoardPlayer.create({ type: PlayerType.Yellow, color: 'bg-yellow-400' })
    if (result.isFailure()) {
      return Result.failure(result.getError());
    }

    return Result.success(result.getValue());
  }
}