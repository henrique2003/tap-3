import { useGameCtx } from "@/src/contexts";
import { GAME } from "@/src/conts/game";
import { StorageManager } from "@/src/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { GameRulesModalProps } from "./props";

export const useGameRulesModal = ({ forceShow, onClose }: GameRulesModalProps) => {
  const [hideNextTime, setHideNextTime] = useState(false);
  const [visible, setVisible] = useState(false);

  const { game: { started } } = useGameCtx()

  useEffect(() => {
    (async () => {
      let visible = true;

      const result = await StorageManager.getItem(GAME.HIDE_RULES_STORAGE_KEY);  
      if (result.isSuccess() && result.getValue() === 'true') {
        visible = false;
      }

      setVisible(visible);
    })();
  }, []);

  const handleStart = async () => {
    if (hideNextTime) {
      await AsyncStorage.setItem(GAME.HIDE_RULES_STORAGE_KEY, 'true');
    }

    setVisible(false);

    if (onClose) {
      onClose()
    }
  };

  function handleHideNextTime(value: boolean): void {
    setHideNextTime(value);
  }

  return {
    visible: forceShow ?? (visible && started),
    handleStart,
    handleHideNextTime,
    hideNextTime
  }
}