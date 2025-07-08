'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Button from '../components/Button'; 
import {
  ArrowLeft,
  EnvelopeSimple,
  Phone,
  IdentificationBadge,
  Buildings,
  UserCircle,
  Calendar,
} from 'phosphor-react';



interface Admin {
  fullName: string;
  email: string;
  phone: string;
  username: string;
}

interface Employee {
  fullName: string;
  email: string;
  phone: string;
  employeeId: string;
  department: string;
}

interface Payment {
  date: string;
  day: string;
  time: string;
  workingPayment: number;
}

interface EmployeeWithPayments {
  employee: Employee;
  payments: Payment[];
  total: number;
}

export default function AdminDashboard() {
  const searchParams = useSearchParams();
  const username = searchParams.get('username');
  const router = useRouter();

  const [admin, setAdmin] = useState<Admin | null>(null);
  const [data, setData] = useState<EmployeeWithPayments[]>([]);
  const [months, setMonths] = useState<string[]>([]);
  const [selectedMonth, setSelectedMonth] = useState('All');
  const [loading, setLoading] = useState(true);

  // Get admin info
  useEffect(() => {
    const fetchAdmin = async () => {
      if (!username) return;
      try {
        const res = await axios.get(`/api/admin/${username}`);
        setAdmin(res.data);
      } catch (err) {
        console.error('Failed to fetch admin:', err);
      }
    };
    fetchAdmin();
  }, [username]);

  // Fetch employee + payment data
  useEffect(() => {
    const fetchEmployeePayments = async () => {
      try {
        const res = await axios.get('/api/admin/employeePayments');
        setData(res.data);

        const allMonths = res.data
          .flatMap((emp: EmployeeWithPayments) =>
            emp.payments.map((p: Payment) => getMonthFromDate(p.date))
          );
        const unique = Array.from(new Set(allMonths));
        setMonths(['All', ...(unique as string[])]);
      } catch (err) {
        console.error('Failed to fetch employee payments:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchEmployeePayments();
  }, []);

const getMonthFromDate = (date: string): string => {
  const parsed = new Date(date);
  if (isNaN(parsed.getTime())) {
    // fallback: manually parse DD/MM/YYYY
    const [day, month, year] = date.split('/');
    if (day && month && year) {
      return `${year}-${month.padStart(2, '0')}`;
    }
    return 'Invalid';
  }
  const year = parsed.getFullYear();
  const month = String(parsed.getMonth() + 1).padStart(2, '0');
  return `${year}-${month}`;
};

  // const getMonthFromDate = (date: string): string => {
  //   const [year, month] = date.split('-');
  //   return `${year}-${month}`; // Format: 2025-06
  // };

  const goHome = () => router.push('/');

  const filteredData = data.map(({ employee, payments }) => {
    const filteredPayments =
      selectedMonth === 'All'
        ? payments
        : payments.filter((p) => getMonthFromDate(p.date) === selectedMonth);
    const total = filteredPayments.reduce((sum, p) => sum + p.workingPayment, 0);
    return { employee, payments: filteredPayments, total };
  });

  if (loading) return <p className="text-center font-bold text-2xl">Loading...</p>;
  if (!admin) return <p className="text-center mt-10 text-red-600">Admin not found.</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Back Button */}
      <div>
 
<Button
  onClick={goHome}
  icon={<ArrowLeft size={20} />}
  label="Back to Home"
  className="px-4 py-2 rounded-lg shadow bg-blue-600 hover:bg-blue-700"
/>


      </div>

      {/* Admin Profile */}
      <div className="bg-white border border-gray-400 rounded-xl shadow-sm p-6 sm:p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <UserCircle size={24} className="text-blue-600" />
          Welcome, {admin.fullName}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
          <p className="flex items-center gap-2">
            <EnvelopeSimple size={18} className="text-indigo-500" />
            <span className="font-medium">Email:</span> {admin.email}
          </p>
          <p className="flex items-center gap-2">
            <Phone size={18} className="text-green-500" />
            <span className="font-medium">Phone:</span> {admin.phone}
          </p>
          <p className="flex items-center gap-2">
            <IdentificationBadge size={18} className="text-blue-500" />
            <span className="font-medium">Username:</span> {admin.username}
          </p>
        </div>
      </div>

      {/* Month Filter */}
      <div className="flex items-center justify-center gap-2">
        <Calendar size={20} className="text-gray-600" />
        <label className="text-gray-700 font-medium">Filter by Month:</label>
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="border border-gray-300 rounded px-2 py-1 text-sm"
        >
          {months.map((m) => (
            <option key={m} value={m}>
              {m === 'All' ? 'All' : formatMonthLabel(m)}
            </option>
          ))}
        </select>
      </div>

      {/* Title */}
      <div>
        <h2 className="text-3xl text-center font-bold text-gray-600 border-b pb-2">
          All Employees & Monthly Payments
        </h2>
      </div>

      {/* Employee Payments */}
      {filteredData.map(({ employee, payments, total }, idx) =>
        payments.length > 0 ? (
          <div key={idx} className="bg-white border border-gray-400 rounded-xl shadow p-6 sm:p-8 space-y-6">
            {/* Employee Info */}
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2 flex items-center gap-2">
                <UserCircle size={20} className="text-gray-700" />
                {employee.fullName}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-700">
                <p className="flex items-center gap-2">
                  <EnvelopeSimple size={18} className="text-indigo-500" />
                  <span className="font-medium">Email:</span> {employee.email}
                </p>
                <p className="flex items-center gap-2">
                  <Phone size={18} className="text-green-500" />
                  <span className="font-medium">Phone:</span> {employee.phone}
                </p>
                <p className="flex items-center gap-2">
                  <IdentificationBadge size={18} className="text-blue-500" />
                  <span className="font-medium">Employee ID:</span> {employee.employeeId}
                </p>
                <p className="flex items-center gap-2">
                  <Buildings size={18} className="text-yellow-600" />
                  <span className="font-medium">Department:</span> {employee.department}
                </p>
              </div>
            </div>

            {/* Payments Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-center border-t border-gray-500">
                <thead className="bg-green-200 text-gray-700 uppercase text-xs tracking-wide">
                  <tr>
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3">Day</th>
                    <th className="px-4 py-3">Time</th>
                    <th className="px-4 py-3">Payment</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {payments.map((p, i) => (
                    <tr key={i} className="hover:bg-gray-50 transition">
                      <td className="px-4 py-2 text-slate-500">{p.date}</td>
                      <td className="px-4 py-2 text-slate-500">{p.day}</td>
                      <td className="px-4 py-2 text-slate-500">{p.time}</td>
                      <td className="px-4 py-2 text-slate-500 font-medium">Rs. {p.workingPayment}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Total Payment */}
            <div className="text-right text-lg font-semibold text-green-600">
              Total Payment: Rs. {total}
            </div>
          </div>
        ) : null
      )}
    </div>
  );
}

// Format: 2025-06 → June 2025
function formatMonthLabel(month: string): string {
  const [year, monthIndex] = month.split('-');
  const date = new Date(Number(year), Number(monthIndex) - 1);
  return `${date.toLocaleString('default', { month: 'long' })} ${year}`;
}
