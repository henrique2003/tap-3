import { SafeAreaView } from "react-native-safe-area-context"
import { SafeContainerProps } from "./props"

export const SafeContainer: React.FC<SafeContainerProps> = ({ children, className }) => {
  return (
    <SafeAreaView className={`flex-1 bg-default-primary justify-center items-center ${className}`}>
      {children}
    </SafeAreaView> 
  )
}
