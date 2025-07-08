// /pages/EmployeeRegistration.tsx

'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { PageType } from '../types/pages';
import {
  IdentificationCard,
  EnvelopeSimple,
  Phone,
  IdentificationBadge,
  User,
  Buildings,
  Lock,
  LockKey,
  UserPlus
} from 'phosphor-react';
import Button from '../components/Button';


type Props = {
  setCurrentPage: (page: PageType) => void;
};




const employeeSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  email: z.string().email('Invalid email'),
  phone: z.string().min(10, 'Phone must be at least 10 digits'),
  employeeId: z.string().min(3, 'Employee ID is required'),
  username: z.string().min(3, 'Username is required'),
  department: z.string().min(2, 'Department is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

type EmployeeFormData = z.infer<typeof employeeSchema>;

const EmployeeRegistration: React.FC<Props> = ({setCurrentPage}) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EmployeeFormData>({
    resolver: zodResolver(employeeSchema),
  });

  const onSubmit = async (data: EmployeeFormData) => {
    try {
      const res = await fetch('/api/employee/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || 'Failed to register');

      toast.success('Employee registered successfully!');
      reset();
      router.push('/employeeLogin'); // Navigate to login page
    } catch (error: any) {
      toast.error('Error: ' + error.message);
    }
  };

  return (
      <div className="max-w-xl mx-auto mt-10 bg-white text-gray-600 p-8 shadow-zinc-400 shadow-2xl rounded-lg ">
  
      {/* Back Button */}
       <Button
    onClick={() => setCurrentPage('home')}
    label="Back to Home"
  />
  
  <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-gray-800">
    <UserPlus size={24} className="text-green-600" />
    Employee Registration
  </h2>

  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
    {[
      { label: 'Full Name', name: 'fullName', type: 'text', placeholder: 'Jane Doe', icon: <IdentificationCard size={18} className="text-gray-400" /> },
      { label: 'Email', name: 'email', type: 'email', placeholder: 'jane@example.com', icon: <EnvelopeSimple size={18} className="text-gray-400" /> },
      { label: 'Phone', name: 'phone', type: 'tel', placeholder: '9876543210', icon: <Phone size={18} className="text-gray-400" /> },
      { label: 'Employee ID', name: 'employeeId', type: 'text', placeholder: 'EMP123', icon: <IdentificationBadge size={18} className="text-gray-400" /> },
      { label: 'Username', name: 'username', type: 'text', placeholder: 'janeuser', icon: <User size={18} className="text-gray-400" /> },
      { label: 'Department', name: 'department', type: 'text', placeholder: 'Salon', icon: <Buildings size={18} className="text-gray-400" /> },
      { label: 'Password', name: 'password', type: 'password', placeholder: '******', icon: <Lock size={18} className="text-gray-400" /> },
      { label: 'Confirm Password', name: 'confirmPassword', type: 'password', placeholder: '******', icon: <LockKey size={18} className="text-gray-400" /> },
    ].map(({ label, name, type, placeholder, icon }) => (
      <div key={name} className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2">{icon}</span>
        <input
          {...register(name as keyof EmployeeFormData)}
          type={type}
          placeholder={placeholder}
          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:outline-none"
        />
        {errors[name as keyof EmployeeFormData] && (
          <p className="text-red-500 text-sm mt-1">
            {errors[name as keyof EmployeeFormData]?.message as string}
          </p>
        )}
      </div>
    ))}

   <Button
            type="submit"
            icon={<UserPlus size={18} />}
            label="Employee Register"
            className="w-full"
          />
  </form>
</div>





  );
};

export default EmployeeRegistration;































