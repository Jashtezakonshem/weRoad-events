import React, { FunctionComponent, memo } from "react";
import { View, StyleSheet, Text, Dimensions, Pressable } from "react-native";
import { Colors } from "@/constants/colors";
import { Event as EventType } from "@/types/event";
import Chip from "@/components/Chip";
import Entypo from "@expo/vector-icons/Entypo";
import { DateTime } from "luxon";
import { getFormattedDate, hasLowAvailability, isFull } from "@/utils/event";

type EventProps = {
  event: EventType;
  onPress?: () => void;
};

const Event: FunctionComponent<EventProps> = ({ event, onPress }) => {
  const full = isFull(event);
  const lowAvailability = hasLowAvailability(event);
  const date = getFormattedDate(event);

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.container,
        {
          opacity: full ? 0.5 : 1,
          borderColor: full ? Colors.dark : Colors.light,
        },
      ]}
    >
      <Text style={styles.title}>{event.title}</Text>
      <Text numberOfLines={4} style={styles.description}>
        {event.description}
      </Text>
      <View style={styles.infoRow}>
        <Chip
          icon={<Entypo name="location-pin" size={16} color={Colors.white} />}
          text={event.location}
          color={Colors.secondary}
        />
        <Text>{date}</Text>
      </View>
      <View style={styles.availabilityRow}>
        {lowAvailability ? (
          <Text style={styles.availabilityLabel}>
            only {event.capacity - event.registrations} spots left
          </Text>
        ) : undefined}
        <Text
          style={[
            styles.availability,
            { color: full ? Colors.primary : Colors.secondary },
          ]}
        >
          {full ? "Full" : `${event.registrations} / ${event.capacity}`}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width - 16,
    height: 200,
    padding: 8,
    borderRadius: 8,
    backgroundColor: Colors.light,
    marginBottom: 16,
    alignItems: "baseline",
    justifyContent: "space-between",
    elevation: 2,
    shadowColor: Colors.dark,
    shadowRadius: 1,
    shadowOffset: { width: 12, height: 12 },
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.primary,
  },
  description: {
    fontSize: 16,
    color: Colors.dark,
    marginTop: 8,
  },
  infoRow: {
    alignSelf: "stretch",
    flexDirection: "row",
    marginTop: 8,
    justifyContent: "space-between",
    alignItems: "center",
  },
  availabilityRow: {
    alignSelf: "stretch",
    flexDirection: "row",
    marginTop: 8,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  availabilityLabel: {
    fontWeight: "bold",
    color: Colors.primary,
  },
  availability: {
    fontSize: 16,
    marginLeft: 16,
    fontWeight: "bold",
    color: Colors.primary,
    alignSelf: "flex-end",
  },
});

export default memo(Event);
