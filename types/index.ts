export type Event = {
  id: string;
  title: string;
  description: string;
  location: string;
  date: string;
  capacity: number;
  reservationsCount?: number;
  reservations?: Reservation[];
};

export type Reservation = {
  eventId: string;
  email: string;
  telephone: string;
};
