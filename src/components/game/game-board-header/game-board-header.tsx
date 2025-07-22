import { useTranslation } from "react-i18next"
import { Text, View } from "react-native"
import { GameBoardHeaderProps } from "./props"

export const GameBoardHeader: React.FC<GameBoardHeaderProps> = ({
  board,
  movesUntilDrop
}) => {
  const { t } = useTranslation()
  
  return (
    <View className="flex-row items-center justify-between px-8 py-3 border-b border-neutral-700 w-full">
      <View className="flex-row items-center justify-start gap-3">
        <View
          className={`w-10 h-10 rounded-md ${board.player1 === board.currentPlayer ? "opacity-100 scale-110" : "opacity-40"} ${board.player1.color}`}
        />
        <Text className="text-white text-xl font-bold">
          {board.player1.wins}
        </Text>
      </View>
      <Text className="text-white text-xl font-bold">
        {t("game-board.drop-in")}: {movesUntilDrop}
      </Text>
      <View className="flex-row items-center justify-start gap-3">
        <Text className="text-white text-xl font-bold">
          {board.player2.wins}
        </Text>
        <View
          className={`w-10 h-10 rounded-md ${board.player2 === board.currentPlayer ? "opacity-100 scale-110" : "opacity-40"} ${board.player2.color}`}
        />
      </View>
    </View>
  )
}
