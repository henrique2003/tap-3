import { AntDesign, Entypo, FontAwesome5, FontAwesome6, Ionicons } from "@expo/vector-icons"
import { useTranslation } from "react-i18next"
import { Modal, Pressable, Text, View } from "react-native"
import { AnimatedRank, PlayAgainButton } from "../../index"
import { EndGameModalProps } from "./props"

export const EndGameModal: React.FC<EndGameModalProps> = ({
  onClose,
  visible,
  onPlayAgain,
  win,
  totalDrops,
  totalMoves,
  rank
}) => {
  const { t } = useTranslation()

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View className="flex-1 bg-black/50 ease justify-center items-center px-5">
        <View className="bg-default-primary rounded-lg w-full max-w-md shadow-lg border border-gray-500/20">
          <View className="w-full flex-row p-6 py-3 justify-between items-center">
            <View></View>
            <View className="flex-row justify-center items-center gap-2">
              {win ? (
                <>
                  <FontAwesome5 name="trophy" size={22} color="#FFD700" />
                  <Text className="text-xl mt-3.5 font-semibold text-center text-white mb-4">
                    {t("end-game-modal.you-win")}
                  </Text>
                </>
              ) : (
                <>
                  <Entypo name="emoji-sad" size={22} color="red" />
                  <Text className="text-xl mt-3.5 font-semibold text-center text-white mb-4">
                    {t("end-game-modal.not-this-time")}
                  </Text>
                </>
              )}
            </View>
            <Pressable
              onPress={onClose}
            >
              <Ionicons name="close" size={34} color="#ffffff99" />
            </Pressable>
          </View>

          <View className="w-full px-6 bg-black/50 py-10">
            <AnimatedRank
              rank={rank}
              win={win}
            />
            <View className="w-full flex-row justify-center items-center gap-10">
              <View className="flex-col justify-center items-center gap-1">
                <View className="flex-row justify-center items-center gap-1">
                  <AntDesign name="play" size={20} color="rgb(129, 182, 76);" />
                  <Text className="font-bold text-xl text-default-grenn-300">{totalMoves}</Text>
                </View>
                <Text className="font-semibold text-lg text-default-grenn-300">{t("end-game-modal.plays")}</Text>
              </View>
              <View className="flex-col justify-center items-center gap-1">
                <View className="flex-row justify-center items-center gap-2">
                  <FontAwesome6 name="arrows-down-to-line" size={20} color="rgb(129, 182, 76);" />
                  <Text className="font-bold text-xl text-default-grenn-300">{totalDrops}</Text>
                </View>
                <Text className="font-semibold text-lg text-center w-full text-default-grenn-300">Drops</Text> 
              </View>
            </View>

            <View className="flex-row justify-center items-center gap-[10px] mt-10">
              <PlayAgainButton onPress={async () => await onPlayAgain()} />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  )
}
