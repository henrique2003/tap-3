import { FontAwesome } from "@expo/vector-icons"
import { router } from "expo-router"
import { TouchableOpacity } from "react-native"
import { GoBackButtonProps } from "./props"

export const GoBackButton: React.FC<GoBackButtonProps> = ({
  ...rest
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => router.back()}
      {...rest}
    >
      <FontAwesome name="arrow-left" size={24} color="#ffffff77" />
    </TouchableOpacity>
  )
}
