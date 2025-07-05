import { GAME } from "@/src/conts/game";
import { PlayerType } from "../enums";
import { BoardPlayerFactory } from "../factories";
import { Result } from "../sahred-kernel";
import { BoardPlayer } from "../value-objects";

export class Board {
  constructor(
    public rows: number,
    public columns: number,
    public cells: number[][],
    public player1: BoardPlayer,
    public player2: BoardPlayer,
    public currentPlayer: BoardPlayer,
    public locked: boolean,
  ) {}

  static create({
    rows,
    columns,
    cells = Array.from({ length: rows }, () => Array(columns).fill(0))
  }: {
    rows: number,
    columns: number,
    cells?: number[][],
  }): Result<Board> {
    if (!rows) {
      return Result.failure('Rows must be greater than 0');
    }

    if (!columns) {
      return Result.failure('Columns must be greater than 0');
    }

    const player1 = BoardPlayerFactory.red();
    if (player1.isFailure()) {
      return Result.failure(player1.getError());
    }

    const player2 = BoardPlayerFactory.yellow();
    if (player2.isFailure()) {
      return Result.failure(player2.getError());
    }
    
    return Result.success(new Board(rows, columns, cells, player1.getValue(), player2.getValue(), player1.getValue(), false));
  }

  public dropLine(): Result<void> {
    this.cells.pop();
    this.cells.unshift(Array(GAME.BOARD.COLS).fill(0));

    return Result.success();
  }

  public nextPlayer(): Result<void> {
    this.currentPlayer = this.currentPlayer.type === PlayerType.Red ? this.player2 : this.player1;

    return Result.success();
  }

  public declareWinner(): Result<void> {
    if (this.currentPlayer.type === this.player1.type) {
      this.player1.incrementWins();
    } else {
      this.player2.incrementWins();
    }

    return Result.success();
  }

  public playAgain(): Result<void> {
    this.cells = Array.from({ length: this.rows }, () => Array(this.columns).fill(0));
    this.currentPlayer = this.player1;

    this.unlock();

    return Result.success();
  }

  public lock(): Result<void> {
    this.locked = true;

    return Result.success();
  }

  public unlock(): Result<void> {
    this.locked = false;

    return Result.success();
  }

  public clone(): Board {
    const clonedCells = this.cells.map(row => [...row]);
    const clonedPlayer1 = this.player1.clone();
    const clonedPlayer2 = this.player2.clone();
    const clonedCurrentPlayer = this.currentPlayer.type === clonedPlayer1.type ? clonedPlayer1 : clonedPlayer2;

    return new Board(this.rows, this.columns, clonedCells, clonedPlayer1, clonedPlayer2, clonedCurrentPlayer, this.locked);
  }
}