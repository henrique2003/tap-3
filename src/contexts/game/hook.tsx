import { useContext } from "react";
import { GameContext } from "./game-context";

export function useGameCtx() {
  const context = useContext(GameContext);

  if (!context)  {
    throw new Error('useGame must be used within TabBarProvider');
  }

  return context;
}