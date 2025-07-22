import { BaseButton, GoBackButton, InputTextIcon, SafeContainer } from "@/src/components"
 
import { BaseButtonBehavior } from "@/src/components/buttons/base-button/props"
import { FontAwesome } from "@expo/vector-icons"
import { useTranslation } from "react-i18next"
import { Text, View } from "react-native"
import { useRegisterUser } from "./hook"

export const RegisterUser: React.FC = () => {
  const {
    isLoading,
    username: {
      value,
      behavior,
      message
    },
    handleChangeUsername,
    handleSubmit
  } = useRegisterUser()
  const { t } = useTranslation()

  return (
    <SafeContainer>
      <View className="flex-1 justify-center items-center relative w-full">
        <GoBackButton className="absolute top-8 left-10" />
        <View className="max-w-[350px] w-full flex-1 justify-between items-center">
          <View></View>
          <View className="w-full gap-8 justify-center items-center">
            <Text className="text-white text-2xl font-semibold">{t("register-user.enter")}</Text>
            <InputTextIcon
              className="w-full"
              placeholder="Username"
              value={value}
              onChangeText={handleChangeUsername}
              behavior={behavior}
              message={message}
            >
              <FontAwesome name="user" size={20} color="#999" />
            </InputTextIcon>
          </View>
          <BaseButton
            text={t("register-user.play")}
            onPress={handleSubmit}
            behavior={isLoading ? BaseButtonBehavior.Loading : BaseButtonBehavior.Normal}
          />
        </View>
      </View>
    </SafeContainer>
  )
}
