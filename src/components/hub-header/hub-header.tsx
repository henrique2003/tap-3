import { avatar03 } from "@/src/assets"
import { FontAwesome5 } from "@expo/vector-icons"
import { Image, Text, View } from "react-native"
import { HubHeaderProps } from "./props"

export const HubHeader: React.FC<HubHeaderProps> = ({
  rank,
  username
}) => {
  return (
    <View className='w-full max-w-[350px] py-2 flex-row justify-between items-center'>
      <View className='flex-row items-center gap-2'>
        <Image width={50} height={50} className='rounded-full w-[50px] h-[50px]' source={avatar03} />
        <Text className="text-white font-bold text-xl">{username}</Text>
      </View>
      <View className='flex-row items-center gap-2'>
        <FontAwesome5 name="trophy" size={22} color={rank.color} />
        <Text className="text-white font-bold text-lg">{rank.value}</Text>
      </View>
    </View>
  )
}
