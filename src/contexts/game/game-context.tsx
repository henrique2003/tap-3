import React, { createContext, useState } from 'react';
import { GameContextType } from './types';

export const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [game, setGame] = useState({
    started: false
  });
  const [customComponent, setCustomComponent] = useState<React.ReactNode | null>(null);

  function startGame(child: React.ReactNode): void {
    setGame({
      started: true
    })
    setCustomComponent(child);
  }

  function finishGame(): void {
    setGame({
      started: false
    })
    setCustomComponent(null)
  }

  return (
    <GameContext.Provider value={{ customComponent, game, startGame, finishGame }}>
      {children}
    </GameContext.Provider>
  );
}
