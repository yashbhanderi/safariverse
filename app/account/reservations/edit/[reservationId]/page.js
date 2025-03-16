import UpdateReservation from "@/app/_components/UpdateReservation";
import { getReservation, getCamp } from "@/app/_lib/data-service";

export default async function Page(context) {
  const params = await context.params;
  const { reservationId } = params;

  const { campId, numGuests, observations } = await getReservation(reservationId);
  const { maxCapacity } = await getCamp(campId);

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Edit Reservation #{reservationId}
      </h2>

      <UpdateReservation
        maxCapacity={maxCapacity}
        reservationId={reservationId}
        numGuests={numGuests}
        observations={observations}
      />
    </div>
  );
}
