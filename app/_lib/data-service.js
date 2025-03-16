import { eachDayOfInterval } from "date-fns";
import { supabase } from "@/app/_lib/supabase";
import { notFound } from "next/navigation";

/////////////
// GET

export async function getCamp(id) {
  const { data, error } = await supabase
    .from("camps")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    notFound();
  }

  return data;
}

export async function getCampPrice(id) {
  const { data, error } = await supabase
    .from("camps")
    .select("regularPrice, discount")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
  }

  return data;
}

export const getCamps = async function () {
  const { data, error } = await supabase
    .from("camps")
    .select("id, name, maxCapacity, regularPrice, discount, image")
    .order("id");

  if (error) {
    console.error(error);
    throw new Error("Camps could not be loaded");
  }

  return data;
};

// Guests are uniquely identified by their email address
export async function getGuest(email) {
  const { data, error } = await supabase
    .from("guests")
    .select("*")
    .eq("email", email)
    .single();

  // No error here! We handle the possibility of no guest in the sign in callback
  return data;
}

export async function getReservation(id) {
  const { data, error, count } = await supabase
    .from("reservations")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Reservation could not get loaded");
  }

  return data;
}

export async function getReservations(guestId) {
  const { data, error } = await supabase
    .from("reservations")
    .select(
      "id, createdAt, startDate, endDate, numNights, numGuests, totalPrice, guestId, campId, camps(name, image)"
    )
    .eq("guestId", guestId)
    .order("startDate");

  if (error) {
    console.error(error);
    throw new Error("Reservations could not get loaded");
  }

  return data;
}

export async function getReservedDatesByCampId(campId) {
  let today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  today = today.toISOString();

  // Getting all reservations
  const { data, error } = await supabase
    .from("reservations")
    .select("*")
    .eq("campId", campId)
    .or(`startDate.gte.${today},status.eq.checked-in`);

  if (error) {
    console.error(error);
    throw new Error("Reservations could not get loaded");
  }

  // Converting to actual dates to be displayed in the date picker
  const bookedDates = data
    .map((reservation) => {
      return eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });
    })
    .flat();

  return bookedDates;
}

export async function getSettings() {
  const { data, error } = await supabase.from("settings").select("*").single();

  if (error) {
    console.error(error);
    throw new Error("Settings could not be loaded");
  }

  return data;
}

export async function getCountries() {
  try {
    const res = await fetch(
      "https://restcountries.com/v2/all?fields=name,flag"
    );
    const countries = await res.json();
    return countries;
  } catch {
    throw new Error("Could not fetch countries");
  }
}

// CREATE

export async function createGuest(newGuest) {
  const { data, error } = await supabase.from("guests").insert([newGuest]);

  if (error) {
    console.error(error);
    throw new Error("Guest could not be created");
  }

  return data;
}
