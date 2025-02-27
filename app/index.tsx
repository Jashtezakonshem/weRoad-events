import React, { FunctionComponent, useCallback, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Colors } from "@/constants/colors";
import EventItem from "@/components/Event";
import eventsSample from "../samples/events.json";
import { type Event } from "@/types/event";
import Logo from "@/assets/images/logo.png";
import { useRouter } from "expo-router";

const Events: FunctionComponent = () => {
  const router = useRouter();
  const [events, setEvents] = useState<Event[]>(eventsSample);

  const renderEvent = useCallback(({ item }: { item: Event }) => {
    return (
      <EventItem
        event={item}
        onPress={() => router.push(`eventDetails/${item.id}`)}
      />
    );
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={events}
        ListHeaderComponent={Header}
        keyExtractor={(item: Event) => item.id}
        renderItem={renderEvent}
        style={styles.list}
        contentContainerStyle={{ paddingBottom: 16, alignItems: "center" }}
      />
    </SafeAreaView>
  );
};

const Header: FunctionComponent = () => {
  return (
    <View>
      <Image
        source={Logo}
        resizeMode="contain"
        style={{ width: Dimensions.get("window").width / 2, height: 100 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: 16,
  },
  list: {
    marginTop: 16,
  },
});
export default Events;
