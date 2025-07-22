import { AnimatedPlayButton, EndGameModal, GameBoardCell, GameBoardHeader, GameRulesModal, HubHeader, SafeContainer } from '@/src/components';
import { SlideToggleAnimarion } from '@/src/components/animations/slide-toggle-animation/slide-toggle-animation';
import { useGameCtx } from '@/src/contexts';
import { useUserCtx } from '@/src/contexts/user/hook';
import React from 'react';
import { View } from 'react-native';
import { useGame } from './hook';

export const Game: React.FC = () => {
  const {
    movesUntilDrop,
    board,
    dropPiece,
    showRules,
    handleChangeShowRules,
    handleClickPlay,
    showWinnerModal,
    handleClickCloseWinnerModal,
    handleClickPlayAgain,
    totalMoves,
    delta,
    isRedWin
  } = useGame();  

  const { game: { started } } = useGameCtx()
  const { user: {
    username,
    points,
  } } = useUserCtx()

  return (
    <SafeContainer>
      <View className='flex-1 justify-center items-center overflow-hidden w-full'>
        <View className="flex-1 overflow-hidden w-full">
          <SlideToggleAnimarion visible={!started} direction='down'>
            <HubHeader
              rank={{
                color: points.rank.color,
                value: points.value
              }}
              username={username}
            />
          </SlideToggleAnimarion>
          <SlideToggleAnimarion visible={started} direction='down' height={400}>
            <GameBoardHeader
              board={board}
              movesUntilDrop={movesUntilDrop}
            />
          </SlideToggleAnimarion>

          <View className="flex-1 items-center justify-center">
            <GameBoardCell board={board} onDropPiece={dropPiece} />
            <AnimatedPlayButton onPress={handleClickPlay} show={started} />
          </View>

          <GameRulesModal forceShow={showRules} onClose={() => handleChangeShowRules(false)} />
        </View>
        <View className='h-[35px]'></View>
      </View>
      <GameRulesModal />
      <EndGameModal
        visible={showWinnerModal}
        win={isRedWin}
        totalDrops={board.drops}
        totalMoves={totalMoves}
        onPlayAgain={handleClickPlayAgain}
        onClose={handleClickCloseWinnerModal}
        rank={{
          color: points.rank.color,
          value: points.value,
          valueBefore: points.previousValue,
          delta
        }}
      />
    </SafeContainer>
  )
}
