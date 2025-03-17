import React from "react";
import TextExpander from "@/app/_components/TextExpander";
import Image from "next/image";
import { EyeSlashIcon, MapPinIcon, UsersIcon } from "@heroicons/react/24/solid";

export default function Camp({ camp }) {
  const { name, maxCapacity, image, description } = camp;

  return (
    <div className="flex flex-col lg:grid lg:grid-cols-[3fr_4fr] gap-6 lg:gap-20 border border-primary-800 py-3 px-4 sm:px-6 lg:px-10 mb-12 md:mb-24">
      <div className="relative h-64 sm:h-80 lg:h-auto lg:scale-[1.15] lg:-translate-x-3 order-1 lg:order-none">
        <Image src={image} fill className="object-cover" alt={`${name}`} />
      </div>

      <div className="order-2 lg:order-none">
        <h3 className="text-accent-100 font-black text-3xl sm:text-4xl md:text-5xl lg:text-7xl mb-3 md:mb-5 p-4 lg:p-6 lg:pb-1 bg-primary-950 w-full lg:w-[150%] lg:translate-x-[-254px]">
          {name}
        </h3>

        <p className="text-base sm:text-lg text-primary-300 mb-6 md:mb-10">
          <TextExpander>{description}</TextExpander>
        </p>

        <ul className="flex flex-col gap-3 md:gap-4 mb-5 md:mb-7">
          <li className="flex gap-2 md:gap-3 items-center">
            <UsersIcon className="h-5 w-5 text-primary-600 flex-shrink-0" />
            <span className="text-base md:text-lg">
              For up to <span className="font-bold">{maxCapacity}</span> guests
            </span>
          </li>
          <li className="flex gap-2 md:gap-3 items-center">
            <MapPinIcon className="h-5 w-5 text-primary-600 flex-shrink-0" />
            <span className="text-base md:text-lg">
              Located in the heart of the{" "}
              <span className="font-bold">Dolomites</span> (Italy)
            </span>
          </li>
          <li className="flex gap-2 md:gap-3 items-center">
            <EyeSlashIcon className="h-5 w-5 text-primary-600 flex-shrink-0" />
            <span className="text-base md:text-lg">
              Privacy <span className="font-bold">100%</span> guaranteed
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}