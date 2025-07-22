import { useEffect, useMemo, useRef, useState } from "react";
import { Animated, Easing } from "react-native";
import { AnimatedRankProps } from "./props";

export const useAnimatedRank = ({
  rank: {
    valueBefore,
    delta
  },
  win
}: AnimatedRankProps) => {
  const [animatedRank, setAnimatedRank] = useState(valueBefore);

  const finalRank = useMemo(() => {
    const value = win ? valueBefore + delta : valueBefore - delta

    return value <= 0 ? 0 : value;
  }, [win, valueBefore, delta]);

  const animation = useRef(new Animated.Value(valueBefore)).current;

  useEffect(() => {
    Animated.timing(animation, {
      toValue: finalRank,
      duration: 1000,
      easing: Easing.out(Easing.quad),
      useNativeDriver: false,
    }).start();

    const listener = animation.addListener(({ value }) => {
      setAnimatedRank(Math.round(value));
    });

    return () => {
      animation.removeListener(listener);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finalRank]);

  return {
    animatedRank
  }
}