import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from "react";
import {
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import { Colors } from "@/constants/colors";
import EventItem from "@/components/Event";
import { type Event } from "@/types";
import Logo from "@/assets/images/logo.png";
import { useRouter } from "expo-router";
// this is just for having axios defaults
import "@/api";
import { getEvents } from "@/api";

const Events: FunctionComponent = () => {
  const router = useRouter();
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const loadEvents = async () => {
      const events = await getEvents();
      setEvents(events);
    };
    loadEvents();
  }, []);

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
      <Image source={Logo} resizeMode="contain" style={styles.logo} />
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
  logo: { width: Dimensions.get("window").width / 2, height: 100 },
});
export default Events;
