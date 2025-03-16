"use client";

import React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Filter({ currentFilter }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  function handleFilter(filter) {
    const params = new URLSearchParams(searchParams);
    params.set("capacity", filter);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="border border-primary-800 flex">
      <button
        className={`px-5 py-2 
        ${
          !(
            currentFilter === "small" ||
            currentFilter === "medium" ||
            currentFilter === "large"
          )
            ? "bg-accent-600 pointer-events-none text-primary-900"
            : "hover:bg-primary-700"
        }`}
        onClick={() => handleFilter("all")}
      >
        All camps
      </button>
      <button
        className={`px-5 py-2 
          ${
            currentFilter === "small"
              ? "bg-accent-600 pointer-events-none text-primary-900"
              : "hover:bg-primary-700"
          }`}
        onClick={() => handleFilter("small")}
      >
        1&mdash;3 guests
      </button>
      <button
        className={`px-5 py-2 
          ${
            currentFilter === "medium"
              ? "bg-accent-600 pointer-events-none text-primary-900"
              : "hover:bg-primary-700"
          }`}
        onClick={() => handleFilter("medium")}
      >
        4&mdash;7 guests
      </button>
      <button
        className={`px-5 py-2 
          ${
            currentFilter === "large"
              ? "bg-accent-600 pointer-events-none text-primary-900"
              : "hover:bg-primary-700"
          }`}
        onClick={() => handleFilter("large")}
      >
        8&mdash;12 guests
      </button>
    </div>
  );
}
