import axios from "axios";
import { Event, Reservation } from "@/types";

axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.headers.post["Content-Type"] = "application/json";

export const getEvents = async (): Promise<Event[]> => {
  const { data } = await axios.get("/events");
  console.log(data);
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
  console.log("POST RESERVATION", data);
  return data;
};
