import { ComponentProps } from "react";
import { TouchableOpacity } from "react-native";

export type BaseButtonProps = ComponentProps<typeof TouchableOpacity> & {
  text: string;
  behavior?: BaseButtonBehavior;
}

export enum BaseButtonBehavior {
  Normal = 0,
  Loading = 1
}