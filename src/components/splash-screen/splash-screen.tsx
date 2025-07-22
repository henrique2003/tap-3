import { logo } from "@/src/assets"
import { ActivityIndicator, Image, View } from "react-native"
import { SafeContainer } from "../safe-container/safe-container"

export const SplashScreen: React.FC = () => {
  return (
    <SafeContainer>
      <View className="flex-1 justify-center items-center max-w-[350px] w-full px-8">
        <Image source={logo} width={100} height={50} className="w-[320px] h-[180px]" />
        <ActivityIndicator size="large" color="#ffffff44" className="mt-20" />
      </View>
    </SafeContainer>
  )
}
