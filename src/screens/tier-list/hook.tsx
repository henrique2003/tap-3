import { TierListItemDto } from "@/src/domain/dtos"
import { TierListService } from "@/src/infra"
import { useFocusEffect } from "expo-router"
import { useCallback, useEffect, useState } from "react"

const tierListService = new TierListService()

export const useTierList = () => {
  const [users, setUsers] = useState<TierListItemDto[]>([])
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [hasMore, setHasMore] = useState(true)

  const fetchTierList = useCallback(async (currentPage: number, isRefresh = false) => {
    if (isLoading) return

    setIsLoading(true)
    const result = await tierListService.getAll(currentPage)

    if (result.isFailure()) {
      setIsLoading(false)
      return
    }

    const newUsers = result.getValue()

    setUsers((prev) => {
      if (isRefresh || currentPage === 1) return newUsers
      return [...prev, ...newUsers]
    })

    setHasMore(newUsers.length >= 20)
    setIsLoading(false)
  }, [isLoading])

  const refreshTierList = async () => {
    setRefreshing(true)
    await fetchTierList(1, true)
    setPage(2)
    setRefreshing(false)
  }

  const handleEndReached = () => {
    if (!isLoading && hasMore) {
      fetchTierList(page)
      setPage((prev) => prev + 1)
    }
  }

  useEffect(() => {
    void refreshTierList()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) 

  useFocusEffect(
    useCallback(() => {
      void refreshTierList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
  )

  return {
    refreshTierList,
    users,
    isLoading,
    refreshing,
    handleEndReached
  }
}