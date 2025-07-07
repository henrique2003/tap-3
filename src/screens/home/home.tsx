import { logo } from "@/src/assets";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export const Home: React.FC = () => {
  const { t } = useTranslation()

  return (
    <SafeAreaView className="flex-1 bg-default-primary">
      <View className="flex-1 bg-default-primary justify-center items-center px-8">
        <View className="flex-1 justify-center items-center max-w-[300px] w-full">
          <View className="flex-1 justify-center items-center w-full">
            <Image source={logo} width={100} height={50} className="w-[320px] h-[180px] mb-20" />

            <TouchableOpacity
              className="border border-blue-600 py-4 px-8 w-full mb-6 rounded-md"
              onPress={() => router.push("/game-singleplayer")}
              >
              <Text className="text-center text-lg text-blue-600 font-semibold">
                {t("home.single-player")}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="border py-4 px-8 w-full mb-6 rounded-md border-orange-500"
              onPress={() => router.push("/game-2-players")}
              >
              <Text className="text-center text-lg text-orange-500 font-semibold">
                {t("home.two-players")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}
