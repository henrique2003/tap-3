
export type EndGameModalProps = {
  visible: boolean;
  win: boolean;
  totalMoves: number;
  totalDrops: number;
  rank: {
    valueBefore: number
    value: number
    delta: number
    color: string
  }
  onClose: () => void;
  onPlayAgain: () => Promise<void>;
};