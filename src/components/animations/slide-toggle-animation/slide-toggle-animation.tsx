import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { SlideToggleAnimarionProps } from './props';

export const SlideToggleAnimarion: React.FC<SlideToggleAnimarionProps> = ({
  visible,
  direction = 'down',
  children,
  height = 100,
  duration = 600,
  style,
}) => {
  const translateY = useRef(new Animated.Value(direction === 'down' ? -height : height)).current;

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: visible ? 0 : (direction === 'down' ? -height : height),
      duration,
      useNativeDriver: true,
    }).start();
  }, [visible, direction, translateY, height, duration]);

  return (
    <Animated.View style={[{ transform: [{ translateY }] }, style]} className='w-full justify-center items-center overflow-hidden absolute'>
      {children}
    </Animated.View>
  );
};
