import { useGameCtx } from "@/src/contexts"
import { AntDesign, Entypo } from "@expo/vector-icons"
import { TouchableOpacity, View } from "react-native"
import { GameBoardFooterProps } from "./props"

export const GameBoardFooter: React.FC<GameBoardFooterProps> = ({
  onClickShowRules
}) => {
  const { finishGame } = useGameCtx()

  return (
    <View className="flex-row justify-between items-center w-full pb-2 px-7">
      <TouchableOpacity onPress={() => finishGame()} className="p-1 opacity-80">
        <Entypo name="arrow-with-circle-left" size={26} color="white" />
      </TouchableOpacity>
      <TouchableOpacity onPress={onClickShowRules} className="p-1 opacity-80">
        <AntDesign name="questioncircleo" size={26} color="white" />
      </TouchableOpacity>
    </View>
  )
}
