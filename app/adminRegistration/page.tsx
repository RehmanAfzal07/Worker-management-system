// /pages/AdminRegistration.tsx
'use client'
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast'; 
import { PageType } from '../types/pages';
import {
  IdentificationCard,
  EnvelopeSimple,
  Phone,
  User,
  Lock,
  LockKey,
  UserPlus
} from 'phosphor-react';
import Button from '../components/Button';




type Props = {
  setCurrentPage: (page: PageType) => void;
};

const adminSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  username: z.string().min(4, 'Username must be at least 4 characters'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

type AdminFormData = z.infer<typeof adminSchema>;

const AdminRegistration: React.FC<Props> = ({setCurrentPage}) => {
    const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AdminFormData>({
    resolver: zodResolver(adminSchema),
  });





  const onSubmit = async (data: AdminFormData) => {
  try {
    const res = await fetch('/api/admin/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || 'Failed to register');
     toast.success('Admin registration successful! ✅');
     router.refresh();
     router.push('/adminLogin'); 
     reset();
  } catch (error: any) {
    alert('Error: ' + error.message);
  }
};


  return (
   
    <div className="max-w-xl mx-auto mt-10 bg-white text-gray-800 p-8 shadow-md rounded-lg">
        {/* Back Button */}
     <Button
  onClick={() => setCurrentPage('home')}
  label="Back to Home"
/>
     
  <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-gray-800">
    <UserPlus size={24} className="text-blue-600" />
    Admin Registration
  </h2>

  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

    {/* Full Name */}
    <div className="relative">
      <IdentificationCard size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
      <input
        {...register('fullName')}
        placeholder="Full Name"
        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
      {errors.fullName && (
        <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
      )}
    </div>

    {/* Email */}
    <div className="relative">
      <EnvelopeSimple size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
      <input
        {...register('email')}
        type="email"
        placeholder="Email"
        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
      {errors.email && (
        <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
      )}
    </div>

    {/* Phone */}
    <div className="relative">
      <Phone size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
      <input
        {...register('phone')}
        type="tel"
        placeholder="Phone"
        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
      {errors.phone && (
        <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
      )}
    </div>

    {/* Username */}
    <div className="relative">
      <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
      <input
        {...register('username')}
        placeholder="Username"
        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
      {errors.username && (
        <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
      )}
    </div>

    {/* Password */}
    <div className="relative">
      <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
      <input
        {...register('password')}
        type="password"
        placeholder="Password"
        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
      {errors.password && (
        <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
      )}
    </div>

    {/* Confirm Password */}
    <div className="relative">
      <LockKey size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
      <input
        {...register('confirmPassword')}
        type="password"
        placeholder="Confirm Password"
        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
      {errors.confirmPassword && (
        <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
      )}
    </div>

    {/* Submit Button */}
    <div>
     <Button
            type="submit"
            icon={<UserPlus size={18} />}
            label="Register Admin"
            className="w-full"
          />
    </div>
  </form>
</div>


  );
};

export default AdminRegistration;
