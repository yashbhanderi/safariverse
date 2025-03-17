"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

// If you have an API route or similar to get the session, adjust the fetch URL accordingly.
export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [session, setSession] = useState(null);

  useEffect(() => {
    async function fetchSession() {
      try {
        const response = await fetch('/api/auth/session');
        const data = await response.json();
        setSession(data);
      } catch (error) {
        console.error("Error fetching session:", error);
      }
    }
    fetchSession();
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="z-10">
      {/* Desktop Navigation */}
      <ul className="hidden md:flex gap-16 items-center text-xl">
        <li>
          <Link href="/camps" className="hover:text-accent-400 transition-colors">
            Camps
          </Link>
        </li>
        <li>
          <Link href="/about" className="hover:text-accent-400 transition-colors">
            About
          </Link>
        </li>
        <li>
          {session?.user?.image ? (
            <Link
              href="/account"
              className="hover:text-accent-400 transition-colors flex items-center gap-4"
            >
              <img
                src={session.user.image}
                alt={session.user.name}
                referrerPolicy="no-referrer"
                className="h-8 w-8 rounded-full"
              />
              <span>Guest area</span>
            </Link>
          ) : (
            <Link
              href="/account"
              className="hover:text-accent-400 transition-colors"
            >
              Guest area
            </Link>
          )}
        </li>
      </ul>

      {/* Mobile Navigation */}
      <div className="md:hidden flex items-center">
        <button onClick={toggleMenu} className="text-2xl focus:outline-none">
          {isOpen ? (
            // Close icon (X)
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            // Hamburger icon
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {isOpen && (
        <ul className="md:hidden mt-4 space-y-4 text-xl">
          <li>
            <Link
              href="/camps"
              className="block hover:text-accent-400 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Camps
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="block hover:text-accent-400 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
          </li>
          <li>
            {session?.user?.image ? (
              <Link
                href="/account"
                className="block hover:text-accent-400 transition-colors flex items-center gap-4"
                onClick={() => setIsOpen(false)}
              >
                <img
                  src={session.user.image}
                  alt={session.user.name}
                  referrerPolicy="no-referrer"
                  className="h-8 w-8 rounded-full"
                />
                <span>Guest area</span>
              </Link>
            ) : (
              <Link
                href="/account"
                className="block hover:text-accent-400 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Guest area
              </Link>
            )}
          </li>
        </ul>
      )}
    </nav>
  );
}
