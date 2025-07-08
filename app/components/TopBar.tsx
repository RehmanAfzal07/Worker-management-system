import React, { useState } from 'react';
import {
  House,
  UserPlus,
  UsersThree,
  SignIn,
  SignOut,
  List,
  X
} from 'phosphor-react';
import { PageType } from '../types/pages';

type TopBarProps = {
  setCurrentPage: (page: PageType) => void;
};

const TopBar: React.FC<TopBarProps> = ({ setCurrentPage }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNav = (page: PageType) => {
    setCurrentPage(page);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-gradient-to-r from-indigo-900 to-blue-800  text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-18 ">
        <div
          onClick={() => handleNav('home')}
          className="bg-white text-slate-900 px-3 py-1 rounded font-extrabold text-lg cursor-pointer tracking-wide"
        >
          WMS
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6 text-sm items-center bg-gradient-to-r from-indigo-600 to-blue-500 p-3 rounded ">
          <button onClick={() => handleNav('home')} className="flex items-center gap-1 hover:text-indigo-300 transition">
            <House size={18} /> Home
          </button>
          <button onClick={() => handleNav('admin-registration')} className="flex items-center gap-2 p-1 hover:text-indigo-300 transition hover:p-0.5 rounded bg-gradient-to-r from-indigo-900 to-blue-700">
            <UserPlus size={18} /> Admin Registration
          </button>
          <button onClick={() => handleNav('admin-login')} className="flex items-center gap-2 p-1 hover:text-indigo-300 transition hover:p-0.5 rounded bg-gradient-to-r from-indigo-900 to-blue-700">
            <SignIn size={18} /> Admin Login
          </button>
          <button onClick={() => handleNav('employee-registration')} className="flex items-center gap-2 p-1 hover:text-indigo-300 transition hover:p-0.5 rounded bg-gradient-to-r from-indigo-900 to-blue-700">
            <UsersThree size={18} /> Employee Registration
          </button>
          <button onClick={() => handleNav('employee-login')} className="flex items-center gap-2 p-1 hover:text-indigo-300 transition hover:p-0.5 rounded bg-gradient-to-r from-indigo-900 to-blue-700">
            <SignOut size={18} /> Employee Login
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button onClick={() => setIsMobileMenuOpen(true)} className="md:hidden">
          <List size={28} />
        </button>
      </div>

      {/* Mobile Slide-Down Menu */}
      <div
        className={`md:hidden fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-indigo-900 to-blue-700 text-white transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="p-6">
          <div className="flex justify-end mb-4">
            <button onClick={() => setIsMobileMenuOpen(false)}>
              <X size={24} className='bg-red-500 rounded-4xl p-0.5 hover:bg-white hover:text-black' />
            </button>
          </div>
          <nav className="flex flex-col space-y-4 text-base">
            <button onClick={() => handleNav('home')} className="flex items-center gap-2 hover:text-indigo-300">
              <House size={18} /> Home
            </button>
            <button onClick={() => handleNav('admin-registration')} className="flex items-center gap-2 hover:text-indigo-300">
              <UserPlus size={18} /> Admin Registration
            </button>
            <button onClick={() => handleNav('admin-login')} className="flex items-center gap-2 hover:text-indigo-300">
              <SignIn size={18} /> Admin Login
            </button>
            <button onClick={() => handleNav('employee-registration')} className="flex items-center gap-2 hover:text-indigo-300">
              <UsersThree size={18} /> Employee Registration
            </button>
            <button onClick={() => handleNav('employee-login')} className="flex items-center gap-2 hover:text-indigo-300">
              <SignOut size={18} /> Employee Login
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default TopBar;















































