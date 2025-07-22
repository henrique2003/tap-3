export type AnimatedRankProps = {
  win: boolean;
  rank: {
    valueBefore: number
    value: number
    delta: number
    color: string
  }
};