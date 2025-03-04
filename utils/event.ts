import { Event } from "@/types";
import { DateTime } from "luxon";

export const isFull = (event?: Event): boolean =>
  event ? event.reservationsCount === event.capacity : false;

export const hasLowAvailability = (event?: Event): boolean => {
  if (!event) {
    return false;
  }
  const full = isFull(event);
  const count = event.reservationsCount || event.reservations?.length || 0;
  return !full && event.capacity - count <= 5;
};

export const getFormattedDate = (event?: Event): string => {
  if (!event || !event.date) {
    return "No date";
  }
  return DateTime.fromISO(event.date).toLocaleString(DateTime.DATE_SHORT);
};
