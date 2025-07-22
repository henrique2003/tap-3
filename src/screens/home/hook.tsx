import { useUserCtx } from "@/src/contexts/user/hook"
import { CONFIG_USER } from "@/src/conts"
import { UserService } from "@/src/infra"
import { StorageManager } from "@/src/utils"
import { router } from "expo-router"
import { useEffect, useState } from "react"

const userService = new UserService()

export const useHome = () => {
  const [isLoading, setisLoading] = useState(false)

  const { loadUser } = useUserCtx()

  useEffect(() => {
    (async () => {
      setisLoading(true)

      const storageId = await StorageManager.getItem(CONFIG_USER.USER_ID_STORAGE_KEY)
      if (storageId.isFailure() || !storageId.getValue()) {        
        return setisLoading(false)
      }      

      const result = await userService.getById(storageId.getValue()!)
      if (result.isFailure()) {
        console.log(result.getError());
        
        return setisLoading(false)
      }

      loadUser(result.getValue()!)
      router.push("/(tabs)/game")

      setisLoading(false)
    })()
  }, [loadUser])

  return {
    isLoading
  }
}