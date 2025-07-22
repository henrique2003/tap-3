import { Board } from "@/src/domain";

export type GameBoardCellProps = {
  board: Board;
  onDropPiece: (colIndex: number) => void;
}