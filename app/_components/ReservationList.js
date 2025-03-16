"use client";

import React, { useOptimistic } from "react";
import ReservationCard from "./ReservationCard";
import { deleteReservation } from "../_lib/actions";

export default function ReservationList({ reservations }) {
  const [optimisticReservations, optimisticDelete] = useOptimistic(
    reservations,
    (currentReservations, reservationId) => {
      return currentReservations.filter(
        (reservation) => reservation.id !== reservationId
      );
    }
  );

  async function handleDelete(reservationId) {
    optimisticDelete(reservationId);
    await deleteReservation(reservationId);
  }

  return (
    <ul className="space-y-6">
      {optimisticReservations.map((reservation) => (
        <ReservationCard
          reservation={reservation}
          key={reservation.id}
          onDelete={handleDelete}
        />
      ))}
    </ul>
  );
}
