import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native"
import { BaseButtonBehavior, BaseButtonProps } from "./props"

export const BaseButton: React.FC<BaseButtonProps> = ({
  text,
  behavior = BaseButtonBehavior.Normal,
  ...rest
}) => {
  return (
    <TouchableOpacity
      className={`bg-orange-500/70 w-full h-[50px] mb-6 rounded-lg pb-1 overflow-hidden ${rest.className}`}
      disabled={behavior === BaseButtonBehavior.Loading}
      {...rest}
    >
      <View className="w-full justify-center items-center bg-orange-500 h-full rounded-lg">
        <Text className="text-center text-lg text-white font-bold">
          {behavior === BaseButtonBehavior.Loading ? <ActivityIndicator size="small" color="#ffffff99" /> : text}
        </Text>
      </View>
    </TouchableOpacity>
  )
}
