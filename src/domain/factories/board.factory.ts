import { GAME } from "@/src/conts/game";
import { Board } from "../entities";
import { Result } from "../sahred-kernel";

const { BOARD: { COLS, ROWS } } = GAME;

export class BoardFactory {
  static create(): Result<Board> {
    return Board.create({
      rows: ROWS,
      columns: COLS,
    });
  }
}