import React, { FunctionComponent, ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Colors } from "@/constants/colors";

type ChipProps = {
  color?: string;
  icon?: ReactNode;
  text: string;
};
const Chip: FunctionComponent<ChipProps> = ({ text, color, icon }) => {
  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      {!!icon ? <View style={styles.iconWrapper}>{icon}</View> : undefined}
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0,
    width: "auto",
    flexDirection: "row",
    padding: 4,
    paddingHorizontal: 8,
    borderRadius: 16,
    alignItems: "center",
  },
  iconWrapper: {
    marginRight: 4,
  },
  text: {
    color: Colors.white,
    fontSize: 16,
  },
});

export default Chip;
