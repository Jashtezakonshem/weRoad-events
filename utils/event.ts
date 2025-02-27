import { Event } from "@/types/event";
import { DateTime } from "luxon";

export const isFull = (event: Event): boolean =>
  event.registrations === event.capacity;

export const hasLowAvailability = (event: Event): boolean => {
  const full = isFull(event);
  return !full && event.capacity - event.registrations <= 5;
};

export const getFormattedDate = (event: Event): string => {
  if (!event.date) {
    return "No date";
  }
  return DateTime.fromISO(event.date).toLocaleString(DateTime.DATE_SHORT);
};
