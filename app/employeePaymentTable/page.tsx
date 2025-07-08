'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import {
  TrashSimple,
  Calendar,
  Clock,
  CurrencyCircleDollar,
} from 'phosphor-react';

interface Payment {
  _id: string;
  date: string; // assume 'YYYY-MM-DD'
  day: string;
  time: string;
  workingPayment: number;
}

type GroupedPayments = {
  [monthYear: string]: Payment[];
};

function formatMonthYear(dateStr: string): string {
  const [year, month] = dateStr.split('-');
  const date = new Date(`${year}-${month}-01`);
  return date.toLocaleString('default', { month: 'long', year: 'numeric' });
}

export default function EmployeePaymentTable({ employeeId }: { employeeId: string }) {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [grouped, setGrouped] = useState<GroupedPayments>({});

  const fetchPayments = async () => {
    try {
      const res = await axios.get(`/api/employee/payments/${employeeId}`);
      const allPayments: Payment[] = res.data;

      setPayments(allPayments);

      // Group payments by "Month Year"
      const monthGroups: GroupedPayments = {};

      allPayments.forEach((payment) => {
        const key = formatMonthYear(payment.date); // e.g. "June 2025"
        if (!monthGroups[key]) monthGroups[key] = [];
        monthGroups[key].push(payment);
      });

      setGrouped(monthGroups);
    } catch (err) {
      toast.error('Failed to fetch payments');
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/payment/${id}`);
      toast.success('Payment deleted');
      fetchPayments(); // reload after delete
    } catch {
      toast.error('Delete failed');
    }
  };

  return (
    <div className="mt-6 space-y-10">
      {Object.entries(grouped).map(([month, monthPayments]) => {
        const total = monthPayments.reduce((sum, p) => sum + p.workingPayment, 0);

        return (
          <div key={month}>
            <h3 className="text-xl font-bold text-gray-700 mb-2">{month}</h3>

            <div className="overflow-x-auto border rounded">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-100 text-gray-700 font-medium">
                  <tr>
                    <th className="p-2 border flex items-center justify-center gap-1">
                      <Calendar size={16} />
                      Date
                    </th>
                    <th className="p-2 border">Day</th>
                    <th className="p-2 border">
                      <Clock size={16} className="inline mr-1" />
                      Time
                    </th>
                    <th className="p-2 border flex items-center justify-center gap-1">
                      <CurrencyCircleDollar size={16} />
                      Payment
                    </th>
                    <th className="p-2 border text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {monthPayments.map((pay) => (
                    <tr key={pay._id} className="hover:bg-gray-50 transition">
                      <td className="p-2 border text-center">{pay.date}</td>
                      <td className="p-2 border text-center">{pay.day}</td>
                      <td className="p-2 border text-center">{pay.time}</td>
                      <td className="p-2 border text-center">Rs. {pay.workingPayment}</td>
                      <td className="p-2 border text-center">
                        <button
                          onClick={() => handleDelete(pay._id)}
                          className="text-red-600 hover:text-red-700 hover:underline inline-flex items-center gap-1"
                        >
                          <TrashSimple size={16} />
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-gray-100 font-semibold">
                    <td className="p-2 border text-center" colSpan={3}>
                      Total
                    </td>
                    <td className="p-2 border text-center">Rs. {total}/-</td>
                    <td className="p-2 border"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        );
      })}
    </div>
  );
}


