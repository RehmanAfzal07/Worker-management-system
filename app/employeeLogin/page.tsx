// /pages/EmployeeLogin.tsx
'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { IdentificationBadge, Lock, SignIn } from 'phosphor-react';
import { PageType } from '../types/pages';
import Button from '../components/Button';



type Props = {
  setCurrentPage: (page: PageType) => void;
};


const employeeLoginSchema = z.object({
  employeeId: z.string().min(3, 'Employee ID or Username is required'),
  password: z.string().min(6, 'Password is required'),
});

type EmployeeLoginData = z.infer<typeof employeeLoginSchema>;

const EmployeeLogin: React.FC<Props> = ({setCurrentPage}) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmployeeLoginData>({
    resolver: zodResolver(employeeLoginSchema),
  });

  const onSubmit = async (data: EmployeeLoginData) => {
    try {
      const res = await fetch('/api/employee/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) throw new Error(result.message);

      toast.success('Login successful!');
      router.push(`/employeeDashboard?employeeId=${result.employeeId}`);
    } catch (error: any) {
      toast.error('Login failed: ' + error.message);
    }
  };

  return (
<div className="max-w-md mx-auto mt-10 bg-white p-8 shadow-md rounded-lg text-gray-800">
 
     {/* Back Button */}
     <Button
  onClick={() => setCurrentPage('home')}
  label="Back to Home"
/>
 
  <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
    <SignIn size={24} className="text-blue-600" />
    Employee Login
  </h2>

  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

    {/* Employee ID or Username */}
    <div className="relative">
      <IdentificationBadge
        size={18}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
      />
      <input
        {...register('employeeId')}
        type="text"
        placeholder="Employee ID or Username"
        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
      {errors.employeeId && (
        <p className="text-red-500 text-sm mt-1">
          {errors.employeeId.message}
        </p>
      )}
    </div>

    {/* Password */}
    <div className="relative">
      <Lock
        size={18}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
      />
      <input
        {...register('password')}
        type="password"
        placeholder="Password"
        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
      {errors.password && (
        <p className="text-red-500 text-sm mt-1">
          {errors.password.message}
        </p>
      )}
    </div>

    {/* Submit */}
    <Button
            type="submit"
            icon={<SignIn size={18} />}
            label="Login"
            className="w-full"
          />
  </form>
</div>


  );
};

export default EmployeeLogin;
































