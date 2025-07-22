import { GameProvider } from "@/src/contexts"
import { UserProvider } from "@/src/contexts/user/user-context"
import { ProvidersProps } from "./props"

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <UserProvider>
      <GameProvider>
        {children}
      </GameProvider>
    </UserProvider>
  )
}
