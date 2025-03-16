import { Suspense } from "react";
import Spinner from "../_components/Spinner";
import CampList from "../_components/CampList";
import Filter from "../_components/Filter";
import ReservationReminder from "../_components/ReservationReminder";

export const revalidate = 20;

export const metadata = {
  title: "Camps",
};

export default async function Page({ searchParams }) {
  searchParams = await searchParams;
  const filter = searchParams?.capacity ?? null;

  return (
    <div>
      <h1 className="text-4xl mb-5 text-accent-400 font-medium">
      Wild & Luxurious Stays Amidst Nature! 🌿✨
      </h1>
      <p className="text-primary-200 text-lg mb-10">
        Experience the thrill of waking up to the sounds of the wild, surrounded
        by breathtaking landscapes. Whether its a sunrise safari, exploring
        dense jungle trails, or unwinding in your eco-lodge under a starlit sky,
        WildVenture offers the perfect blend of adventure and comfort. Immerse
        yourself in natures beauty, where every stay is an unforgettable escape
        into the wild. Your journey into the heart of the wilderness begins
        here! 🏕️🌄🐾
      </p>

      <div className="flex justify-end mb-8">
        <Filter currentFilter={filter} />
      </div>

      <Suspense fallback={<Spinner />} key={filter}>
        <CampList filter={filter} />
        <ReservationReminder />
      </Suspense>
    </div>
  );
}
