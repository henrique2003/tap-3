import { FontAwesome5 } from "@expo/vector-icons"
import { Text, View } from "react-native"
import { useAnimatedRank } from "./hook"
import { AnimatedRankProps } from "./props"

export const AnimatedRank: React.FC<AnimatedRankProps> = (props) => {
  const {
    rank: {
      color,
      delta,
      value
    },
    win
  } = props 

  const {
    animatedRank
  } = useAnimatedRank(props)

  return (
    <View className="items-center justify-center mt-2 mb-10 flex-row gap-3">
      <View className="gap-2 flex-row">
        <FontAwesome5 name="trophy" size={22} color={color} />
        <Text className="text-white font-bold text-xl">{animatedRank}</Text>
      </View>
      <Text
        className={`text-sm font-semibold ${
          win ? 'text-green-500' : 'text-gray-400'
        }`}
      >
        {win ? `+${delta}` : parseInt(value.toString()) > 0 && `-${delta}`}
      </Text>
    </View>
  )
}
