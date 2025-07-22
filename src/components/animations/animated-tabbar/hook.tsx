import { useGameCtx } from "@/src/contexts";
import { useEffect, useRef } from "react";
import { Animated } from "react-native";

export function useAnimatedTabBar() {
  const tabBarTranslateY = useRef(new Animated.Value(0)).current;
  const customComponentTranslateY = useRef(new Animated.Value(100)).current;
  const { game: { started }, customComponent } = useGameCtx();

  useEffect(() => {
    if (started) {
      Animated.timing(tabBarTranslateY, {
        toValue: 100,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        Animated.timing(customComponentTranslateY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start();
      });
    } else {
      Animated.timing(customComponentTranslateY, {
        toValue: 100,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        Animated.timing(tabBarTranslateY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start();
      });
    }
  }, [customComponentTranslateY, started, tabBarTranslateY]);

  return {
    tabBarTranslateY,
    customComponentTranslateY,
    customComponent,
  };
}