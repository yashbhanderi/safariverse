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
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl sm:text-3xl md:text-4xl mb-3 md:mb-5 text-accent-400 font-medium">
        Wild & Luxurious Stays Amidst Nature! 🌿✨
      </h1>
      <p className="text-primary-200 text-base sm:text-lg mb-6 md:mb-10 max-w-4xl">
        Experience the thrill of waking up to the sounds of the wild, surrounded
        by breathtaking landscapes. Whether its a sunrise safari, exploring
        dense jungle trails, or unwinding in your eco-lodge under a starlit sky,
        WildVenture offers the perfect blend of adventure and comfort. Immerse
        yourself in natures beauty, where every stay is an unforgettable escape
        into the wild. Your journey into the heart of the wilderness begins
        here! 🏕️🌄🐾
      </p>

      <div className="flex justify-end mb-4 md:mb-8">
        <Filter currentFilter={filter} />
      </div>

      <Suspense fallback={<Spinner />} key={filter}>
        <CampList filter={filter} />
        <ReservationReminder />
      </Suspense>
    </div>
  );
}