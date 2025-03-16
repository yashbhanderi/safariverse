import React from "react";
import CampCard from "@/app/_components/CampCard";
import { getCamps } from "@/app/_lib/data-service";

async function CampList({ filter }) {
  const camps = await getCamps();

  let displayedCamps;
  if (filter === "small")
    displayedCamps = camps.filter((camp) => camp.maxCapacity <= 3);
  else if (filter === "medium")
    displayedCamps = camps.filter(
      (camp) => camp.maxCapacity >= 4 && camp.maxCapacity <= 7
    );
  else if (filter === "large")
    displayedCamps = camps.filter((camp) => camp.maxCapacity >= 8);
  else displayedCamps = camps;

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {displayedCamps.map((camp) => (
        <CampCard camp={camp} key={camp.id} />
      ))}
    </div>
  );
}

export default CampList;
