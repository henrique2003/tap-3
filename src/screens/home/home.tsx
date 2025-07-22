import { logo } from "@/src/assets";
import { BaseButton, SafeContainer, SplashScreen } from "@/src/components";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import { Image, View } from "react-native";
import { useHome } from "./hook";

export const Home: React.FC = () => {
  const {
    isLoading
  } = useHome()

  const { t } = useTranslation()

  if (isLoading) {
    return <SplashScreen />
  }

  return (
    <SafeContainer>
      <View className="flex-1 justify-center items-center max-w-[350px] w-full px-8">
        <View className="flex-1 justify-between items-center w-full">
          <View></View>
          <Image source={logo} width={100} height={50} className="w-[320px] h-[180px]" />
          <BaseButton
            text={t("home.enter")}
            onPress={() => router.push("/register-user")}
          />
        </View>
      </View>
    </SafeContainer>
  )
}
