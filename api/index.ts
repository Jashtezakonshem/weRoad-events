import axios from "axios";
import { Availability, Event, Reservation } from "@/types";

axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.headers.post["Content-Type"] = "application/json";

export const getEvents = async ({
  page = 1,
  available,
}: {
  page: number;
  available: Availability;
}): Promise<Event[]> => {
  const { data } = await axios.get("/events", {
    params: {
      page,
      limit: 5,
      available,
    },
  });
  return data;
};

export const getEventById = async (id: string): Promise<Event> => {
  const { data } = await axios.get(`/events/${id}`);
  return data;
};

export const postReservation = async (
  reservation: Reservation,
): Promise<Event> => {
  const { data } = await axios.post("/reservations", reservation);
  return data;
};
