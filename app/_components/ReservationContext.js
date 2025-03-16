"use client";

import React, { useState, useContext } from "react";

const ReservationContext = React.createContext();

function ReservationProvider({ children }) {
  const initialState = { from: undefined, to: undefined };
  const [range, _setRange] = useState(initialState);

  const resetRange = () => {
    console.log("RESETTING RANGE");
    _setRange(initialState);
  };

  const setRange = (newRange) => {
    if (newRange && newRange.from < range.from) {
      _setRange({ from: newRange.from, to: undefined });
    } else _setRange(newRange);
  };

  return (
    <ReservationContext.Provider value={{ range, setRange, resetRange }}>
      {children}
    </ReservationContext.Provider>
  );
}

function useReservation() {
  const context = useContext(ReservationContext);
  if (!context) {
    throw new Error("useReservation must be used within a ReservationProvider");
  }
  return context;
}

export { useReservation, ReservationProvider };
