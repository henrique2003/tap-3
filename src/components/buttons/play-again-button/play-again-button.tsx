import { useTranslation } from "react-i18next"
import { Text, TouchableOpacity, View } from "react-native"
import { PlayButtonProps } from "./props"

export const PlayAgainButton: React.FC<PlayButtonProps> = ({ ...rest }) => {
  const { t } = useTranslation()

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      className="h-[50px] w-[250px] rounded-lg border-2 border-gray-700 justify-center items-center bg-orange-500/70 pb-1 overflow-hidden"
      {...rest}
    >
      <View className="w-full justify-center items-center bg-orange-500 h-full rounded-lg">
        <Text
          className="text-2xl font-bold text-outlin uppercase text-white"
          style={{
            textShadowColor: 'greay',
            textShadowOffset: { width: 1, height: 1 },
            textShadowRadius: 1,
          }}
        >{t('end-game-modal.play-again')}</Text>
      </View>
    </TouchableOpacity>
  )
}