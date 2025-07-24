import { SafeContainer } from "@/src/components"
import { Text, View } from "react-native"

export const Configs: React.FC = () => {
  return (
    <SafeContainer>
      <View className="max-w-[300px] w-full justify-center items-center">
        <Text className="text-xl mt-10 font-bold text-white">Configuracoes</Text>
        <View className="max-w-[500px] w-full rounded-lg bg-black/55 p-4 flex-row mt-6 justify-between items-center">
          
        </View>
      </View>
    </SafeContainer>
  )
}
