'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { User, Lock, SignIn, ArrowLeft } from 'phosphor-react';
import { PageType } from '../types/pages';
import Button from '../components/Button';



const adminLoginSchema = z.object({
  username: z.string().min(4, 'Username is required'),
  password: z.string().min(6, 'Password is required'),
});

type AdminLoginData = z.infer<typeof adminLoginSchema>;
type Props = {
  setCurrentPage: (page: PageType) => void;
};


const AdminLogin: React.FC<Props> = ({ setCurrentPage }) => {
  const router = useRouter();



  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AdminLoginData>({
    resolver: zodResolver(adminLoginSchema),
  });

  const onSubmit = async (data: AdminLoginData) => {
    try {
      const res = await axios.post('/api/admin/login', data);
      const admin = res.data;
      router.push(`/adminDashboard?username=${admin.username}`);
    } catch (error: any) {
      alert('Login failed: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <>


      {/* Login Form */}
      <div className="max-w-md mx-auto mt-6 bg-white text-gray-800 p-8 shadow rounded-lg">
        {/* Back Button */}
        <Button
          onClick={() => setCurrentPage('home')}
          label="Back to Home"
        />
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-gray-800">
          <SignIn size={24} className="text-purple-600" />
          Admin Login
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Username */}
          <div className="relative">
            <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              {...register('username')}
              type="text"
              placeholder="Username"
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">
                {errors.username.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              {...register('password')}
              type="password"
              placeholder="Password"
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:outline-none"
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
    </>
  );
};

export default AdminLogin;



