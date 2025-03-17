"use client";

import { differenceInDays } from "date-fns";
import { createReservation } from "../_lib/actions";
import { useReservation } from "./ReservationContext";
import { redirect } from "next/navigation";
import SubmitButton from "./SubmitButton";

function ReservationForm({ camp, user }) {
  const { range, resetRange } = useReservation();
  const { regularPrice, discount, maxCapacity, id } = camp;
  const numNights = differenceInDays(range.to, range.from);
  const campPrice = numNights * (regularPrice - discount);

  const startDate = range.from;
  const endDate = range.to;

  const reservationData = {
    startDate,
    endDate,
    numNights,
    campPrice,
    discount,
    campId: id,
  };

  const createReservationWithData = createReservation.bind(null, reservationData);

  return (
    <div className="w-full scale-100 sm:scale-[1.01]">
      <div className="bg-primary-800 text-primary-300 px-4 sm:px-8 md:px-16 py-2 flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0">
        <p className="text-sm sm:text-base">Logged in as</p>

        <div className="flex gap-2 sm:gap-4 items-center">
          <img
            referrerPolicy="no-referrer"
            className="h-6 sm:h-8 rounded-full"
            src={user.image}
            alt={user.name}
          />
          <p className="text-sm sm:text-base">{user.name}</p>
        </div>
      </div>

      <form
        action={async (formData) => {
          const result = await createReservationWithData(formData);
          if (result.success) {
            resetRange();
            redirect("/camps/thankyou");
          }
        }}
        className="bg-primary-900 py-6 sm:py-8 md:py-10 px-4 sm:px-8 md:px-16 text-base sm:text-lg flex gap-4 sm:gap-5 flex-col"
      >
        <div className="space-y-1 sm:space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
            className="px-3 sm:px-5 py-2 sm:py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm text-base"
            required
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1 sm:space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            id="observations"
            className="px-3 sm:px-5 py-2 sm:py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm text-base"
            placeholder="Any pets, allergies, special requirements, etc.?"
            rows={3}
          />
        </div>

        <div className="flex justify-end items-center gap-3 sm:gap-6 mt-2">
          {!(startDate && endDate) ? (
            <p className="text-primary-300 text-xs sm:text-sm md:text-base">
              Start by selecting dates
            </p>
          ) : (
            <SubmitButton pendingMessage="Reserving...">
              Reserve now
            </SubmitButton>
          )}
        </div>
      </form>
    </div>
  );
}

export default ReservationForm;