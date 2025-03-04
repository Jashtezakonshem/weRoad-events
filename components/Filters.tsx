import React, { FunctionComponent, memo, useCallback } from "react";
import { View, Pressable, Text, StyleSheet, Dimensions } from "react-native";
import { Colors } from "@/constants/colors";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { Availability } from "@/types";

export type FilterProps = {
  available?: Availability;
  onSelect: (available: Availability) => void;
};
const Filters: FunctionComponent<FilterProps> = ({ available, onSelect }) => {
  const left = useSharedValue(0);
  const borderTopLeftRadius = useSharedValue(10);
  const borderBottomLeftRadius = useSharedValue(10);
  const borderTopRightRadius = useSharedValue(0);
  const borderBottomRightRadius = useSharedValue(0);

  const onOptionPress = useCallback(
    (index: number, a?: Availability) => {
      switch (index) {
        case 0:
          borderTopLeftRadius.value = 10;
          borderBottomLeftRadius.value = 10;
          borderTopRightRadius.value = 0;
          borderBottomRightRadius.value = 0;
          break;
        case 1:
          borderTopLeftRadius.value = 0;
          borderBottomLeftRadius.value = 0;
          borderTopRightRadius.value = 0;
          borderBottomRightRadius.value = 0;
          break;
        case 2:
          borderTopLeftRadius.value = 0;
          borderBottomLeftRadius.value = 0;
          borderTopRightRadius.value = 10;
          borderBottomRightRadius.value = 10;
          break;
      }
      const spacing = (Dimensions.get("window").width - 16) / 3;
      left.value = withTiming(spacing * index, {
        duration: 150,
      });
      onSelect(a);
    },
    [
      borderBottomLeftRadius,
      borderBottomRightRadius,
      borderTopLeftRadius,
      borderTopRightRadius,
      left,
      onSelect,
    ],
  );

  const animatedStyle = useAnimatedStyle(() => {
    return {
      left: left.value,
      borderTopLeftRadius: borderTopLeftRadius.value,
      borderBottomLeftRadius: borderBottomLeftRadius.value,
      borderTopRightRadius: borderTopRightRadius.value,
      borderBottomRightRadius: borderBottomRightRadius.value,
    };
  });
  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.animatedBackground, animatedStyle]}
      ></Animated.View>
      <Pressable onPress={() => onOptionPress(0, "all")} style={styles.option}>
        <Text
          style={{
            color: available === "all" ? Colors.white : Colors.dark,
          }}
        >
          All
        </Text>
      </Pressable>
      <Pressable
        onPress={() => onOptionPress(1, "available")}
        style={styles.option}
      >
        <Text
          style={{
            color: available === "available" ? Colors.white : Colors.dark,
          }}
        >
          Available
        </Text>
      </Pressable>
      <Pressable
        onPress={() => onOptionPress(2, "unavailable")}
        style={styles.option}
      >
        <Text
          style={{
            color: available === "unavailable" ? Colors.white : Colors.dark,
          }}
        >
          Unavailable
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 40,
    backgroundColor: Colors.light,
    width: Dimensions.get("window").width - 16,
    flexDirection: "row",
    alignSelf: "stretch",
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 16,
  },
  option: {
    flex: 1,
    padding: 10,
    /*backgroundColor: selected === option ? "#007BFF" : "#E0E0E0",*/
    alignItems: "center",
    justifyContent: "center",
    /*borderRightWidth: index < options.length - 1 ? 1 : 0,*/
  },
  selected: {
    backgroundColor: Colors.primary,
  },
  animatedBackground: {
    height: 38, // 40 - 2
    width: "33%",
    position: "absolute",
    left: 0,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    backgroundColor: Colors.primary,
  },
});

export default memo(Filters);
