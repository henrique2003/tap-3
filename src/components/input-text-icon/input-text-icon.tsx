import { Text, TextInput, View } from "react-native";
import { InputBehavior, InputTextIconProps } from "./props";


export const InputTextIcon: React.FC<InputTextIconProps> = ({
  className,
  children,
  behavior = InputBehavior.Normal,
  message,
  ...rest
}) => {
  let borderColor = 'transparent'

  if (behavior === InputBehavior.Error) {
    borderColor = '#ed4337'
  }

  if (behavior === InputBehavior.Success) {
    borderColor = '#5cb85c'
  }

  return (
    <View className="w-full gap-2">
      <View className={`flex-row items-center bg-black/20 rounded-xl px-5 w-full h-[55px] gap-3 ${className} gap-3`} style={{ borderWidth: 2, borderColor }}>
        {children}
        <TextInput
          className="flex-1 h-full text-dark text-[#999] text-lg font-light leading-[18px]"
          placeholderTextColor="#999"
          {...rest}
          />
      </View>
      {message && behavior === InputBehavior.Error && (
        <Text className="text-red-500 text-sm ml-3">{message}</Text>
      )}
    </View>
  );
}
