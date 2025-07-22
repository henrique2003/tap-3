import { GAME } from "@/src/conts/game";
import { StorageManager } from "@/src/utils";

export class GameRulesModalUtils {
  static shouldShowRulesModal = async (): Promise<boolean> => {
    const result = await StorageManager.getItem(GAME.HIDE_RULES_STORAGE_KEY);
    if (result.isFailure()) {
      return true;
    }

    return result.getValue() !== 'true';
  };
} 