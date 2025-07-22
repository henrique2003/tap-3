import { useTranslation } from "react-i18next"
import { Text, TouchableOpacity, View } from "react-native"
import { PlayButtonProps } from "./props"

export const PlayButton: React.FC<PlayButtonProps> = ({ ...rest }) => {
  const { t } = useTranslation()
  
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      className="h-[50px] w-[170px] rounded-lg justify-center items-center bg-orange-500/70 pb-1 overflow-hidden"
      {...rest}
    >
      <View className="w-full justify-center items-center bg-orange-500 h-full rounded-lg">
        <Text
          className="text-3xl font-bold text-outlin uppercase text-white"
          style={{
            textShadowColor: 'greay',
            textShadowOffset: { width: 1, height: 1 },
            textShadowRadius: 1,
          }}
        >{t('game-board.play')}</Text>
      </View>
    </TouchableOpacity>
  )
}