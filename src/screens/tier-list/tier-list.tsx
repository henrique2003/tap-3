import { SafeContainer, TierListItem } from "@/src/components"
import React from "react"
import { useTranslation } from "react-i18next"
import { ActivityIndicator, FlatList, RefreshControl, Text, View } from "react-native"
import { useTierList } from "./hook"

export const TierList: React.FC = () => {
  const {
    refreshTierList,
    handleEndReached,
    isLoading,
    refreshing,
    users
  } = useTierList()

  const { t } = useTranslation()

  return (
    <SafeContainer>
      <View className="flex-1 px-4 pb-4 w-full">
        <Text className="text-2xl font-bold mt-5 mb-4 text-center text-white">{t("tier-list.title")}</Text>

        <FlatList
          className="mt-3 pb-4"
          data={users}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.3}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={refreshTierList} />
          }
          ListFooterComponent={
            isLoading && !refreshing ? (
              <ActivityIndicator size="small" color="#999" />
            ) : null
          }
          renderItem={({ item, index }) => (
            <TierListItem key={item.id} index={index} item={item} />
          )}
        />
      </View>
      <View className='h-[35px]'></View>
    </SafeContainer>
  )
}
