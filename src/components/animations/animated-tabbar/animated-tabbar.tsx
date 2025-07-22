import { BottomTabBar, BottomTabBarProps } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Animated } from 'react-native';
import { useAnimatedTabBar } from './hook';

export function AnimatedTabBar(props: BottomTabBarProps) {
  const {
    tabBarTranslateY,
    customComponentTranslateY,
    customComponent
  } = useAnimatedTabBar();

  return (
    <>
      <Animated.View
        className="absolute bottom-0 left-0 right-0"
        style={{ transform: [{ translateY: tabBarTranslateY }] }}
      >
        <BottomTabBar {...props} />
      </Animated.View>

      {customComponent && (
        <Animated.View
          className="absolute bottom-0 left-0 right-0 h-[70px] bg-[#1F1F25] justify-center items-center z-10"
          style={{ transform: [{ translateY: customComponentTranslateY }] }}
        >
          {customComponent}
        </Animated.View>
      )}
    </>
  );
}
