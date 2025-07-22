import { ComponentProps } from 'react';
import { TextInput } from 'react-native';

export type InputTextIconProps = ComponentProps<typeof TextInput> & {
  children?: React.ReactNode;
  behavior?: InputBehavior
  message?: string;
};

export enum InputBehavior {
  Error = 0,
  Success = 1,
  Normal = 2
}