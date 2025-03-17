import { UsersIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";

function CampCard({ camp }) {
  const { id, name, maxCapacity, regularPrice, discount, image } = camp;

  return (
    <div className="flex flex-col sm:flex-row border-primary-800 border">
      <div className="w-full sm:w-auto sm:flex-1 relative h-52 sm:h-64">
        <Image
          src={image}
          fill
          quality={80}
          alt={`${name}`}
          className="object-cover sm:border-r border-primary-800"
        />
      </div>

      <div className="flex flex-col sm:flex-grow">
        <div className="pt-4 sm:pt-5 pb-3 sm:pb-4 px-4 sm:px-7 bg-primary-950">
          <h3 className="text-accent-500 font-semibold text-xl sm:text-2xl mb-2 sm:mb-3">
            {name}
          </h3>

          <div className="flex gap-2 sm:gap-3 items-center mb-2">
            <UsersIcon className="h-5 w-5 text-primary-600 flex-shrink-0" />
            <p className="text-base sm:text-lg text-primary-200">
              For up to <span className="font-bold">{maxCapacity}</span> guests
            </p>
          </div>

          <p className="flex gap-2 sm:gap-3 justify-end items-baseline">
            {discount > 0 ? (
              <>
                <span className="text-2xl sm:text-3xl font-[350]">
                  ${regularPrice - discount}
                </span>
                <span className="line-through font-semibold text-primary-600">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-2xl sm:text-3xl font-[350]">${regularPrice}</span>
            )}
            <span className="text-primary-200">/ night</span>
          </p>
        </div>

        <div className="bg-primary-950 border-t border-t-primary-800 text-right mt-auto">
          <Link     
            href={`/camps/${id}`}
            className="block sm:inline-block w-full sm:w-auto text-center sm:text-right sm:border-l border-primary-800 py-3 sm:py-4 px-4 sm:px-6 hover:bg-accent-600 transition-all hover:text-primary-900"
          >
            Details & reservation &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CampCard;