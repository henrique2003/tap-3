import { ViewStyle } from "react-native";

export type SlideToggleAnimarionProps = {
  visible: boolean;
  direction?: 'up' | 'down';
  children: React.ReactNode;
  height?: number;
  duration?: number;
  style?: ViewStyle;
}