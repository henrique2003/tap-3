import { GAME } from '@/src/conts/game';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, Pressable, Switch, Text, View } from 'react-native';
import { useGameRulesModal } from './hook';
import { GameRulesModalProps } from './props';

const { BOARD } = GAME;

export const GameRulesModal: React.FC<GameRulesModalProps> = (props) => {
  const {
    handleHideNextTime,
    hideNextTime,
    handleStart,
    visible
  } = useGameRulesModal(props)

  const { t } = useTranslation();

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View className="flex-1 bg-black/80 justify-center items-center px-5">
        <View className="bg-transparent border border-white p-6 w-full max-w-md shadow-lg">
          <Text className="text-xl font-bold text-center text-white mb-4">
            {t('game-rules-modal.how-to-play')}
          </Text>

          <Text className="text-base text-white leading-relaxed mb-6">
            ▸ {t('game-rules-modal.rule-1')}{"\n\n"}
            ▸ {t('game-rules-modal.rule-2-1')} {BOARD.WIN_CONDITION} ▸ {t('game-rules-modal.rule-2-2')}{"\n\n"}
            ▸ {t('game-rules-modal.rule-3-1')} <Text className='text-orange-500 font-semibold'>{BOARD.DROP_CONDITION}</Text> ▸ {t('game-rules-modal.rule-3-2')}{"\n\n"}
            ▸ {t('game-rules-modal.rule-4-1')} {BOARD.WIN_CONDITION} {t('game-rules-modal.rule-4-2')}
          </Text>

          {!props.forceShow && (
            <View className="flex-row gap-2 items-center space-x-3 mb-6">
              <Switch value={hideNextTime} onValueChange={handleHideNextTime} />
              <Text className="text-white font-semibold text-base">{t('game-rules-modal.dont-show-again')}</Text>
            </View>
          )}

          <Pressable
            onPress={handleStart}
            className="bg-transparent border border-blue-600 py-3 items-center"
          >
            <Text className="text-base font-semibold text-blue-600">{t('game-rules-modal.play')}</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

