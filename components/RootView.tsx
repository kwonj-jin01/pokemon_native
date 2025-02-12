import { type ViewProps, type ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeColors } from "@/hooks/useThemeColors";
import Animated, {
  Easing,
  interpolateColor, ReduceMotion,
  useAnimatedStyle, useSharedValue,
  withTiming
} from "react-native-reanimated";
import { useEffect } from "react";

type Props = ViewProps & {
  backgroundcolor?: string;
};

export function RootView({ style, backgroundcolor, ...rest }: Props) {
  const colors = useThemeColors();
  const progress = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => {

    return {
      backgroundColor: interpolateColor(
        progress.value,
        [0, 1],
        [colors.tint, backgroundcolor ?? colors.tint]
      ),
    };
  }, [backgroundcolor]);

  useEffect(() => {
    if (backgroundcolor) {
      progress.value = 0;
      progress.value = withTiming(1, {
        duration: 700,
        easing: Easing.out(Easing.quad),
        reduceMotion: ReduceMotion.System,
      });
    }
  }, [backgroundcolor]);

  const rootStyle = {
    flex: 1,
    padding: 4,
  } satisfies ViewStyle;

  if (!backgroundcolor) {
    return (
      <SafeAreaView style={[rootStyle, { backgroundColor: colors.tint }, style]} {...rest} />
    );
  }
  return (
    <Animated.View style={[{ flex: 1 }, animatedStyle, style]}  >
      <SafeAreaView style={rootStyle} {...rest} />
    </Animated.View>
  )
}
