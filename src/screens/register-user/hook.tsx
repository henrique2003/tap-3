import { InputBehavior, InputTextIconProps } from "@/src/components/input-text-icon/props"
import { useUserCtx } from "@/src/contexts/user/hook"
import { CONFIG_USER } from "@/src/conts"
import { User } from "@/src/domain/entities"
import { UserService } from "@/src/infra"
import { StorageManager } from "@/src/utils"
import { router } from "expo-router"
import { useEffect, useState } from "react"


const userService = new UserService()

export const useRegisterUser = () => {
  const [isLoading, setisLoading] = useState(false)
  const [username, setUsername] = useState<InputTextIconProps>({
    behavior: InputBehavior.Normal,
    message: "",
    children: <></>,
    className: ''
  })

  const { loadUser } = useUserCtx()

  useEffect(() => {
    const getUserId = async () => {
      const result = await StorageManager.getItem(CONFIG_USER.USER_ID_STORAGE_KEY)
      if (result.isFailure() || !result.getValue() || result.getValue()!.length < 2 || typeof result.getValue() !== 'string') {
        return
      }

      const user = await userService.getById(result.getValue()!)
      if (user.isFailure()) {
        return
      }

      loadUser(user.getValue()!)

      router.push("/(tabs)/game")
    }

    void getUserId()
  }, [loadUser])

  function handleChangeUsername(username: string) {
    setUsername(prevState => ({
      ...prevState,
      value: username,
      behavior: InputBehavior.Normal,
    }))
  }

  async function handleSubmit(): Promise<void> {
    setisLoading(true)

    if (!username || !username?.value || username.value?.length < 0) {
      setisLoading(false)

      return setUsername(prevState => ({
        ...prevState,
        behavior: InputBehavior.Error,
        message: "Username is required"
      }))
    }
    
    const result = await userService.create(username.value)
    if (result.isFailure()) {      
      setUsername(prevState => ({
        ...prevState,
        behavior: InputBehavior.Error,
        message: `${result.getError()}`
      }))

      return setisLoading(false)
    }

    const user: User = result.getValue()
    await StorageManager.setItem(CONFIG_USER.USER_ID_STORAGE_KEY, user.id)

    loadUser(result.getValue()!)
    router.push("/(tabs)/game")

    setisLoading(false)
  }

  return {
    isLoading,
    username,
    handleChangeUsername,
    handleSubmit
  }
}