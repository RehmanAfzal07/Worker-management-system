"use client"
import React from 'react';
import { NextPage } from 'next';
import { PageType } from '../types/pages';
import {
  UserPlus,
  SignIn,
  UsersThree,
  SignOut,
  ArrowRight
} from 'phosphor-react';

type HomeProps = {
  setCurrentPage: (page: PageType) => void;
};

const Home: NextPage<HomeProps> = ({ setCurrentPage }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center px-4 py-12">
      <img
        src="/wms.jpeg"  
        alt="Company Logo"
        className="w-24 h-24 md:w-32 md:h-32 mb-6 animate-fade-in"
      />

      <h1 className="text-2xl md:text-3xl font-bold text-white p-2 m-2 text-center animate-pulse rounded-sm bg-gradient-to-r from-indigo-800 to-blue-500">
        Welcome to the Portal
      </h1>

      <p className="text-slate-600 text-lg mb-10 text-center font-light">
        Please select an option below to continue
      </p>

      <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-4 w-full max-w-lg">
        {/* Admin Registration */}
        <button
          onClick={() => setCurrentPage('admin-registration')}
          className="flex items-center justify-between bg-white shadow-xl hover:shadow-2xl transition p-4 rounded-lg border border-gray-200 hover:border-blue-500"
        >
          <div className="flex items-center gap-3">
            <UserPlus size={24} className="text-blue-600" />
            <span className="text-gray-800 font-medium text-sm md:text-lg">Admin Registration</span>
          </div>
          <ArrowRight size={16} className="text-blue-500" />
        </button>

        {/* Admin Login */}
        <button
          onClick={() => setCurrentPage('admin-login')}
          className="flex items-center justify-between bg-white shadow-xl hover:shadow-2xl transition p-4 rounded-lg border border-gray-200 hover:border-purple-500"
        >
          <div className="flex items-center gap-3">
            <SignIn size={24} className="text-purple-600" />
            <span className="text-gray-800 font-medium text-sm md:text-lg">Admin Login</span>
          </div>
          <ArrowRight size={16} className="text-purple-500" />
        </button>

        {/* Employee Registration */}
        <button
          onClick={() => setCurrentPage('employee-registration')}
          className="flex items-center justify-between bg-white shadow-xl hover:shadow-2xl transition p-4 rounded-lg border border-gray-200 hover:border-green-500"
        >
          <div className="flex items-center gap-3">
            <UsersThree size={24} className="text-green-600" />
            <span className="text-gray-800 font-medium text-sm md:text-lg">Employee Registration</span>
          </div>
          <ArrowRight size={16} className="text-green-500" />
        </button>

        {/* Employee Login */}
        <button
          onClick={() => setCurrentPage('employee-login')}
          className="flex items-center justify-between bg-white shadow-xl hover:shadow-2xl transition p-4 rounded-lg border border-gray-200 hover:border-orange-500"
        >
          <div className="flex items-center gap-3">
            <SignOut size={24} className="text-orange-600" />
            <span className="text-gray-800 font-medium text-sm md:text-lg">Employee Login</span>
          </div>
          <ArrowRight size={16} className="text-orange-500" />
        </button>
      </div>
    </div>
  );
};

export default Home;
