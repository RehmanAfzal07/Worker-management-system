'use client';

import React from 'react';
import { ArrowLeft } from 'phosphor-react';

type ButtonType = 'button' | 'submit' | 'reset'; // ✅ Add ButtonType type

interface ButtonProps {
  onClick?: () => void;
  label: string;
  icon?: React.ReactNode;
  className?: string;
  color?: 'blue' | 'green' | 'red' | 'purple' | 'gray';
  type?: ButtonType; // ✅ Add this line to fix the error
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  label,
  icon = <ArrowLeft size={20} />,
  className,
  type = 'button', // ✅ default value
}) => {
  return (
    <div className="m-4">
      <button
        type={type} // ✅ pass type to the native button
        onClick={onClick}
        className={`group relative inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-900 to-blue-700
           text-white text-sm md:text-base font-semibold shadow-md hover:from-indigo-900 hover:to-sky-700 transition-all duration-300 ease-in-out focus:outline-none ${className}`}
      >
        <span className="absolute inset-0 rounded-full bg-white opacity-10 group-hover:opacity-20 transition duration-300 blur-sm"></span>
        <span className="relative z-10 transition-transform group-hover:-translate-x-1">
          {icon}
        </span>
        <span className="relative z-10">{label}</span>
      </button>
    </div>
  );
};

export default Button;




