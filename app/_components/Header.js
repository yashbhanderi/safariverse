"use client";

import Navigation from '@/app/_components/Navigation';
import Logo from '@/app/_components/Logo';
import { useState } from 'react';

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className='relative border-primary-900 px-4 sm:px-6 lg:px-8 py-4 lg:py-5 z-40'>
      <div className='flex justify-between items-center max-w-7xl mx-auto'>
        <Logo />
        
        {/* Desktop Navigation - Hidden on mobile */}
        <div className="hidden md:block">
          <Navigation isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
        
        {/* Mobile menu button - positioned at right edge */}
        <button 
          onClick={toggleMenu} 
          className="md:hidden z-50 text-2xl focus:outline-none"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          {!isOpen && (
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
      
      {/* Mobile Navigation - Only displayed when menu is open */}
      <div className="md:hidden">
        <Navigation isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
      
      {/* Mobile overlay for when menu is open */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-primary-900 bg-opacity-50 z-40"
          onClick={toggleMenu}
          aria-hidden="true"
        />
      )}
    </header>
  );
}

export default Header;