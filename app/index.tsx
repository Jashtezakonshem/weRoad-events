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
import { Availability, type Event } from "@/types";
import Logo from "@/assets/images/logo.png";
import { useRouter } from "expo-router";
// this is just for having axios defaults
import "@/api";
import { getEvents } from "@/api";
import { noMoreEvents } from "@/utils/event";
import Filters, { FilterProps } from "@/components/Filters";

const Events: FunctionComponent = () => {
  const router = useRouter();
  const [available, setAvailable] = useState<Availability>("all");
  const [events, setEvents] = useState<Event[]>([]);
  const [page, setPage] = useState(1);
  const [endReached, setEndReached] = useState(false);

  useEffect(() => {
    const loadEvents = async () => {
      const events = await getEvents({ page: 1, available: "all" });
      setEvents(events);
      if (noMoreEvents(events)) {
        setEndReached(true);
      }
    };
    loadEvents();
  }, []);

  const loadMore = useCallback(async () => {
    if (endReached) {
      return;
    }
    // at this point I have to do page + 1
    // because if I update the state directly, it won't be available in the next render
    const newEvents = await getEvents({ page: page + 1, available });
    if (noMoreEvents(newEvents)) {
      setEndReached(true);
    }
    setEvents([...events, ...newEvents]);
    setPage(page + 1);
  }, [endReached, events, page, available]);

  const renderEvent = useCallback(({ item }: { item: Event }) => {
    return (
      <EventItem
        event={item}
        onPress={() => router.push(`eventDetails/${item.id}`)}
      />
    );
  }, []);

  useEffect(() => {
    setEndReached(false);
    const loadEvents = async () => {
      const events = await getEvents({ page: 1, available });
      setEvents(events);
      if (noMoreEvents(events)) {
        setEndReached(true);
      }
    };
    loadEvents();
  }, [available]);

  return (
    <SafeAreaView style={styles.container}>
      {events.length > 0 ? (
        <FlatList
          data={events}
          ListHeaderComponent={
            <Header onSelect={setAvailable} available={available} />
          }
          keyExtractor={(item: Event) => item.id}
          renderItem={renderEvent}
          onEndReached={loadMore}
          onEndReachedThreshold={0.3}
          style={styles.list}
          contentContainerStyle={{ paddingBottom: 16, alignItems: "center" }}
        />
      ) : null}
    </SafeAreaView>
  );
};

const Header: FunctionComponent<FilterProps> = ({ onSelect, available }) => {
  return (
    <View style={styles.header}>
      <Image source={Logo} resizeMode="contain" style={styles.logo} />
      <Filters onSelect={onSelect} available={available} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: 16,
  },
  header: {
    alignItems: "center",
  },
  list: {
    marginTop: 16,
  },
  logo: { width: Dimensions.get("window").width / 2, height: 100 },
});
export default Events;
