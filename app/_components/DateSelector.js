"use client";

import {
  differenceInDays,
  isPast,
  isSameDay,
  isWithinInterval,
} from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useReservation } from "./ReservationContext";
import { useState, useEffect } from "react";

function isAlreadyBooked(range, datesArr) {
  return (
    range.from &&
    range.to &&
    datesArr.some((date) =>
      isWithinInterval(date, { start: range.from, end: range.to })
    )
  );
}

function DateSelector({ settings, camp, reservedDates }) {
  // STATE
  const { range, setRange, resetRange } = useReservation();
  const displayRange = isAlreadyBooked(range, reservedDates) ? {} : range;
  const [monthsToShow, setMonthsToShow] = useState(2);

  // Use effect to safely check window size on client side only
  useEffect(() => {
    const handleResize = () => {
      setMonthsToShow(window.innerWidth < 768 ? 1 : 2);
    };

    // Set initial value
    handleResize();
    
    // Add event listener
    window.addEventListener("resize", handleResize);
    
    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { regularPrice, discount } = camp;
  const numNights = differenceInDays(displayRange.to, displayRange.from);
  const campPrice = numNights * (regularPrice - discount);

  // SETTINGS
  const { minReservationLength, maxReservationLength } = settings;

  return (
    <div className="flex flex-col justify-between h-full">
      <style jsx global>{`
        .rdp {
          margin: 0;
        }
        .rdp-months {
          justify-content: center;
        }
        @media (max-width: 640px) {
          .rdp-months {
            flex-direction: column;
          }
        }
        /* Fix spacing when single month is shown */
        .rdp-month {
          margin: 0 auto;
        }
      `}</style>
      
      <div className="flex-grow flex items-center justify-center">
        <DayPicker
          className="pt-6 sm:pt-12 mx-auto"
          mode="range"
          selected={displayRange}
          onSelect={setRange}
          min={minReservationLength + 1}
          max={maxReservationLength}
          fromMonth={new Date()}
          fromDate={new Date()}
          toYear={new Date().getFullYear() + 5}
          captionLayout="dropdown"
          numberOfMonths={monthsToShow}
          disabled={(currentDate) =>
            isPast(currentDate) ||
            reservedDates.some((reservedDate) => isSameDay(reservedDate, currentDate))
          }
        />
      </div>

      <div className="flex flex-wrap sm:flex-nowrap items-center justify-between px-3 sm:px-6 md:px-8 bg-accent-500 text-primary-800 min-h-[72px] py-3">
        <div className="flex flex-wrap w-full sm:w-auto items-baseline gap-2 sm:gap-4 md:gap-6">
          <p className="flex gap-2 items-baseline">
            {discount > 0 ? (
              <>
                <span className="text-xl sm:text-2xl">${regularPrice - discount}</span>
                <span className="line-through font-semibold text-primary-700 text-sm sm:text-base">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-xl sm:text-2xl">${regularPrice}</span>
            )}
            <span className="text-sm sm:text-base">/night</span>
          </p>
          {numNights ? (
            <>
              <p className="bg-accent-600 px-2 sm:px-3 py-1 sm:py-2 text-xl sm:text-2xl">
                <span>&times;</span> <span>{numNights}</span>
              </p>
              <p>
                <span className="text-sm sm:text-lg font-bold uppercase">Total</span>{" "}
                <span className="text-xl sm:text-2xl font-semibold">${campPrice}</span>
              </p>
            </>
          ) : null}
        </div>

        {range.from || range.to ? (
          <button
            className="border border-primary-800 py-1 sm:py-2 px-3 sm:px-4 text-xs sm:text-sm font-semibold mt-2 sm:mt-0"
            onClick={resetRange}
          >
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default DateSelector;