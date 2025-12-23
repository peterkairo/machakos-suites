-- Initial schema for Machakos Suites
-- Tables: rooms, bookings, reviews, event_inquiries

CREATE TABLE IF NOT EXISTS rooms (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  price NUMERIC(10,2) NOT NULL CHECK (price >= 0),
  capacity INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE IF NOT EXISTS bookings (
  id SERIAL PRIMARY KEY,
  room_id INTEGER REFERENCES rooms(id) ON DELETE CASCADE,
  user_email TEXT NOT NULL,
  check_in DATE NOT NULL,
  check_out DATE NOT NULL,
  num_guests INTEGER NOT NULL DEFAULT 1,
  price NUMERIC(10,2) NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Server-side price calculation function (simplified version)
CREATE OR REPLACE FUNCTION public.calculate_booking_price(p_room_id INTEGER, p_check_in DATE, p_check_out DATE)
RETURNS NUMERIC(10,2) LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE
  base_price NUMERIC(10,2);
  nights INTEGER;
BEGIN
  SELECT price INTO base_price FROM rooms WHERE id = p_room_id;
  IF base_price IS NULL THEN
    RAISE EXCEPTION 'room not found';
  END IF;
  nights := GREATEST(0, (p_check_out - p_check_in));
  RETURN (base_price * nights)::numeric(10,2);
END;
$$;

CREATE OR REPLACE FUNCTION public.set_booking_price()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  NEW.price := public.calculate_booking_price(NEW.room_id, NEW.check_in, NEW.check_out);
  RETURN NEW;
END;
$$;

CREATE TRIGGER booking_price_trigger
BEFORE INSERT ON bookings
FOR EACH ROW EXECUTE FUNCTION public.set_booking_price();
