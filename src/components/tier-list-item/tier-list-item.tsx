import { FontAwesome5 } from "@expo/vector-icons"
import { Text, View } from "react-native"
import { TierListItemProps } from "./props"

export const TierListItem: React.FC<TierListItemProps> = ({
  index,
  item
}) => {
  const getMedal = (index: number) => {
    switch (index) {
      case 0:
        return "🥇"
      case 1:
        return "🥈"
      case 2:
        return "🥉"
      default:
        return `${index + 1}.`
    }
  }

  return (
    <View
      className="bg-black/30 rounded-xl shadow-sm p-4 py-4 mb-3 flex-row items-center justify-between"
    >
      <View className="flex-row items-center gap-2">
        <Text className="text-white font-semibold text-xl w-10">
          {index < 3 ? (
            <Text className="text-3xl">{getMedal(index)}</Text>
          ) : (
            <Text className="text-gray-500">#{index + 1}</Text>
          )}
        </Text>
        <Text className="text-white font-bold text-xl">{item.username}</Text>
      </View>

      <View className="flex-row items-center gap-4">
        <FontAwesome5
          name="trophy"
          size={20}
          color={item.rank.color}
        />
        <Text className="text-white font-bold text-lg">{item.rank.value}</Text>
      </View>
    </View>
  )
}
