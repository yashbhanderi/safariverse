"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Navigation({ isOpen, setIsOpen }) {
  const [session, setSession] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);

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
    
    // Add scroll event listener to detect when user scrolls
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setIsOpen(false);
  
  const navLinks = [
    { href: "/camps", label: "Camps" },
    { href: "/about", label: "About" },
    { 
      href: "/account", 
      label: "Safari Dashboard",
      showImage: true 
    }
  ];

  return (
    <nav className={`z-50 ${isScrolled ? 'shadow-sm' : ''}`}>
      {/* Desktop Navigation */}
      <ul className="hidden md:flex gap-8 lg:gap-16 items-center text-lg lg:text-xl">
        {navLinks.map((link) => (
          <li key={link.href}>
            {link.showImage && session?.user?.image ? (
              <Link
                href={link.href}
                className="hover:text-accent-400 transition-colors flex items-center gap-3"
              >
                <img
                  src={session.user.image}
                  alt={session.user.name || "User avatar"}
                  referrerPolicy="no-referrer"
                  className="h-8 w-8 rounded-full object-cover border border-primary-300"
                />
                <span>{link.label}</span>
              </Link>
            ) : (
              <Link
                href={link.href}
                className="hover:text-accent-400 transition-colors duration-300 relative group"
              >
                {link.label}
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-accent-400 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            )}
          </li>
        ))}
      </ul>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden fixed right-0 top-0 h-screen w-4/5 max-w-sm bg-primary-800 z-50 px-6 py-8 shadow-xl transform transition-transform duration-300 ease-in-out">
          {/* Close button in the sidebar */}
          <button 
            onClick={closeMenu}
            className="absolute top-6 right-10 text-primary-100 hover:text-accent-400 transition-colors z-50"
            aria-label="Close menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          {/* Navigation logo for the sidebar */}
          <div className="mb-10 mt-2">
            <Link href="/" className="flex items-center gap-2" onClick={closeMenu}>
              <div className="relative h-10 w-10">
                <img
                  src="/logo.png"
                  alt="SafariVerse logo"
                  className="object-contain h-full w-full"
                />
              </div>
              <span className="text-lg font-semibold text-primary-100">
                SafariVerse
              </span>
            </Link>
          </div>
          
          <ul className="space-y-6 text-xl mt-12">
            {navLinks.map((link) => (
              <li key={link.href}>
                {link.showImage && session?.user?.image ? (
                  <Link
                    href={link.href}
                    className="flex items-center gap-4 text-primary-100 hover:text-accent-400 transition-colors"
                    onClick={closeMenu}
                  >
                    <img
                      src={session.user.image}
                      alt={session.user.name || "User avatar"}
                      referrerPolicy="no-referrer"
                      className="h-10 w-10 rounded-full object-cover border border-primary-300"
                    />
                    <span>{link.label}</span>
                  </Link>
                ) : (
                  <Link
                    href={link.href}
                    className="block text-primary-100 hover:text-accent-400 transition-colors"
                    onClick={closeMenu}
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}