import { auth } from "../_lib/auth";
import { getReservedDatesByCampId, getSettings } from "../_lib/data-service";
import DateSelector from "./DateSelector";
import LoginMessage from "./LoginMessage";
import ReservationForm from "./ReservationForm";

async function Reservation({ camp }) {
  const [settings, reservedDates] = await Promise.all([
    getSettings(),
    getReservedDatesByCampId(camp.id),
  ]);

  const session = await auth();

  return (
    <div className="grid grid-cols-2 border border-primary-800 min-h-[400px]">
      <DateSelector
        settings={settings}
        reservedDates={reservedDates}
        camp={camp}
      />

      {session?.user ? (
        <ReservationForm camp={camp} user={session.user} />
      ) : (
        <LoginMessage />
      )}
    </div>
  );
}

export default Reservation;
