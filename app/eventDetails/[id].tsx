import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from "react";
import {
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Event } from "@/types";
import { Colors } from "@/constants/colors";
import Chip from "@/components/Chip";
import Entypo from "@expo/vector-icons/Entypo";
import { getFormattedDate, hasLowAvailability, isFull } from "@/utils/event";
import { getEventById } from "@/api";

const EventDetails: FunctionComponent = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [event, setEvent] = useState<Event>();

  useEffect(() => {
    const loadEvent = async () => {
      const event = await getEventById(id as string);
      setEvent(event);
    };
    loadEvent();
  }, [id]);

  const full = isFull(event);
  const lowAvailability = hasLowAvailability(event);
  const date = getFormattedDate(event);

  const showModal = useCallback(() => {
    router.push(`/eventDetails/modal?id=${id}`);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {!event ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      ) : (
        <View style={{ padding: 16 }}>
          <Text style={styles.title}>{event.title}</Text>
          <Text style={styles.description}>{event.description}</Text>
          <View style={styles.infoRow}>
            <Chip
              icon={
                <Entypo name="location-pin" size={16} color={Colors.white} />
              }
              text={event.location}
              color={Colors.secondary}
            />
            <Text>{date}</Text>
          </View>
          <View style={styles.availabilityRow}>
            {lowAvailability ? (
              <Text style={styles.availabilityLabel}>
                only {event.capacity - (event.reservations?.length || 0)} spots
                left
              </Text>
            ) : undefined}
            <Text
              style={[
                styles.availability,
                { color: full ? Colors.primary : Colors.secondary },
              ]}
            >
              {full
                ? "Full"
                : `${event.reservations?.length || 0} / ${event.capacity}`}
            </Text>
          </View>
          <Pressable onPress={showModal} style={styles.button}>
            <Text style={styles.buttonText}>Book this event</Text>
          </Pressable>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.primary,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  description: {
    fontSize: 16,
    color: Colors.dark,
    marginTop: 24,
  },
  infoRow: {
    alignSelf: "stretch",
    flexDirection: "row",
    marginTop: 24,
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
  button: {
    marginTop: 16,
    padding: 16,
    backgroundColor: Colors.primary,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: Colors.white,
    fontSize: 16,
  },
});

export default EventDetails;
