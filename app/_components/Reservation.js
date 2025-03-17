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
    <div className="grid grid-cols-1 lg:grid-cols-2 border border-primary-800 min-h-[400px]">
      <div className="order-1">
        <DateSelector
          settings={settings}
          reservedDates={reservedDates}
          camp={camp}
        />
      </div>

      <div className="order-2">
        {session?.user ? (
          <ReservationForm camp={camp} user={session.user} />
        ) : (
          <LoginMessage />
        )}
      </div>
    </div>
  );
}

export default Reservation;