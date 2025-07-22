export type GameContextType = {
  customComponent: React.ReactNode | null;
  game: {
    started: boolean;
  }
  startGame: (child: React.ReactNode) => void;
  finishGame: () => void;
};