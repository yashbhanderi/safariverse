"use server";
import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import { getReservations } from "./data-service";
import { redirect } from "next/navigation";

export async function updateGuest(form) {
  const session = await auth();

  if (!session) {
    throw new Error("You must be signed in to update your profile.");
  }

  const nationalId = form.get("nationalId");
  const [nationality, countryFlag] = form.get("nationality").split("%");

  const nationalIdRegex = /^\d{6,12}$/;
  if (!nationalIdRegex.test(nationalId)) {
    throw new Error(
      "The national ID number must be a number with 6 to 12 digits."
    );
  }

  const updatedGuest = {
    nationalId,
    nationality,
    countryFlag,
  };

  const { data, error } = await supabase
    .from("guests")
    .update(updatedGuest)
    .eq("id", session.user.guestId);

  if (error) {
    console.error(error);
    throw new Error("Guest could not be updated");
  }

  revalidatePath("/account/profile");
}

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function deleteReservation(reservationId) {
  const session = await auth();
  if (!session) {
    throw new Error("You must be signed in to update your profile.");
  }

  const booings = await getReservations(session.user.guestId);
  const ReservationIds = booings.map((reservation) => reservation.id);

  if (!ReservationIds.includes(reservationId)) {
    throw new Error("You can only delete your own reservations.");
  }

  const { error } = await supabase
    .from("reservations")
    .delete()
    .eq("id", reservationId);

  if (error) {
    console.error(error);
    throw new Error("Reservation could not be deleted");
  }

  revalidatePath("/account/reservations");
}

export async function updateReservation(form) {
  const session = await auth();
  if (!session) {
    throw new Error("You must be signed in to update your profile.");
  }

  const reservations = await getReservations(session.user.guestId);
  const ReservationIds = reservations.map((reservation) =>
    Number(reservation.id)
  );

  const reservationId = form.get("reservationId");
  if (!ReservationIds.includes(Number(reservationId))) {
    throw new Error("You can only update your own reservations.");
  }

  const observations = form.get("observations");
  const numGuests = form.get("numGuests");

  const updatedFields = {
    observations,
    numGuests,
  };

  const { error } = await supabase
    .from("reservations")
    .update(updatedFields)
    .eq("id", reservationId)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Reservation could not be updated!");
  }

  revalidatePath(`/account/reservations/edit/${reservationId}`);
  redirect("/account/reservations");
}

export async function createReservation(reservationData, formData) {
  const session = await auth();
  if (!session) {
    throw new Error("You must be signed in to update your profile.");
  }

  const newReservation = {
    ...reservationData,
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0, 1000),
    extrasPrice: 0,
    totalPrice: reservationData.campPrice,
    isPaid: false,
    hasBreakfast: false,
    status: "unconfirmed",
    guestId: session.user.guestId,
  };

  const { error } = await supabase
    .from("reservations")
    .insert([newReservation]);

  if (error) {
    throw new Error("Reservation could not be created!");
  }

  revalidatePath(`/camps/${reservationData.campId}`);

  return { success: true, campId: reservationData.campId };
}
