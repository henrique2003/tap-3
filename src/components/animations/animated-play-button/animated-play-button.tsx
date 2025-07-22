import { useEffect, useMemo } from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { PlayButton } from '../../index';
import { AnimatedPlayButtonProps } from './props';

export function AnimatedPlayButton({ onPress, show }: AnimatedPlayButtonProps) {
  const translateY = useSharedValue(0);
  const opacity = useSharedValue(1);
  const height = useSharedValue(70);
  
  const duration = useMemo(() => 600, []);

  useEffect(() => {
    if (show) {
      translateY.value = withTiming(30, { duration });
      opacity.value = withTiming(0, { duration });
      height.value = withTiming(0, { duration });
    } else {
      translateY.value = withTiming(0, { duration });
      opacity.value = withTiming(1, { duration });
      height.value = withTiming(70, { duration });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
    height: height.value,
  }));

  return (
    <Animated.View
      className="w-full flex-row justify-center items-center mt-10 overflow-hidden"
      style={animatedStyle}
    >
      <PlayButton onPress={onPress} />
    </Animated.View>
  );
}
