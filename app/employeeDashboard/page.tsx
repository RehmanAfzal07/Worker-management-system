// 'use client';

// import { useEffect, useState } from 'react';
// import { useSearchParams, useRouter } from 'next/navigation';
// import axios from 'axios';
// import {
//   EnvelopeSimple,
//   Phone,
//   IdentificationBadge,
//   Buildings,
//   ArrowLeft,
//   FloppyDisk,
// } from "phosphor-react";
// import Button from '../components/Button';


// interface Employee {
//   fullName: string;
//   email: string;
//   phone: string;
//   employeeId: string;
//   department: string;
// }

// interface Payment {
//   _id?: string;
//   date: string; // expected format: "DD/MM/YYYY" or "YYYY-MM-DD"
//   day: string;
//   time: string;
//   workingPayment: number;
// }

// type GroupedPayments = {
//   [monthYear: string]: Payment[];
// };

// // Helper: Safely parse date string to month-year label
// function formatMonthYear(dateStr: string): string {
//   let date: Date;

//   // Support DD/MM/YYYY
//   if (dateStr.includes('/')) {
//     const [dd, mm, yyyy] = dateStr.split('/');
//     date = new Date(`${yyyy}-${mm}-${dd}`);
//   } else {
//     // Assume YYYY-MM-DD
//     date = new Date(dateStr);
//   }

//   return isNaN(date.getTime())
//     ? 'Invalid Date'
//     : date.toLocaleString('default', { month: 'long', year: 'numeric' }); // e.g., "June 2025"
// }

// export default function EmployeeDashboard() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const employeeId = searchParams.get('employeeId');

//   const [employee, setEmployee] = useState<Employee | null>(null);
//   const [payments, setPayments] = useState<Payment[]>([]);
//   const [grouped, setGrouped] = useState<GroupedPayments>({});
//   const [loading, setLoading] = useState(true);

//   const [formData, setFormData] = useState<Payment>({
//     date: '',
//     day: '',
//     time: '',
//     workingPayment: 0,
//   });

//   const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleAddPayment = async () => {
//     if (!employeeId) return;
//     try {
//       const res = await axios.post('/api/employee/payments/add', {
//         ...formData,
//         workingPayment: Number(formData.workingPayment),
//         employeeId,
//       });
//       setFormData({ date: '', day: '', time: '', workingPayment: 0 });
//       fetchPayments(); // refresh
//     } catch (err) {
//       alert('Failed to save payment');
//       console.error(err);
//     }
//   };

//   const fetchPayments = async () => {
//     try {
//       if (!employeeId) return;
//       const [eRes, pRes] = await Promise.all([
//         axios.get(`/api/employee/${employeeId}`),
//         axios.get(`/api/employee/payments/${employeeId}`),
//       ]);
//       setEmployee(eRes.data);
//       setPayments(pRes.data);

//       const grouped: GroupedPayments = {};
//       pRes.data.forEach((p: Payment) => {
//         const key = formatMonthYear(p.date);
//         if (!grouped[key]) grouped[key] = [];
//         grouped[key].push(p);
//       });

//       setGrouped(grouped);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPayments();
//   }, [employeeId]);

  
//   const goHome = () => router.push('/');

//   if (loading) return <p>Loading...</p>;
//   if (!employee) return <p className="text-red-500">Employee not found.</p>;

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       {/* Back Button */}
//      <Button
//   onClick={goHome}
//   icon={<ArrowLeft size={20} />}
//   label="Back to Home"
//   className="px-4 py-2 rounded-lg shadow bg-blue-600 hover:bg-blue-700"
// />

//       {/* Employee Info */}
//       <div className="p-6 shadow-md border rounded-xl mb-6 space-y-2">
//         <h2 className="text-2xl font-bold">{employee.fullName}</h2>
//         <p className="flex items-center gap-2 text-sm text-gray-700">
//           <EnvelopeSimple size={18} className="text-indigo-500" />
//           {employee.email}
//         </p>
//         <p className="flex items-center gap-2 text-sm text-gray-700">
//           <Phone size={18} className="text-green-500" />
//           {employee.phone}
//         </p>
//         <p className="flex items-center gap-2 text-sm text-gray-700">
//           <IdentificationBadge size={18} className="text-blue-500" />
//           Employee ID: {employee.employeeId}
//         </p>
//         <p className="flex items-center gap-2 text-sm text-gray-700">
//           <Buildings size={18} className="text-yellow-600" />
//           Department: {employee.department}
//         </p>
//       </div>

//       {/* Add Payment */}
//       <h3 className="font-semibold mb-3">Add New Payment</h3>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//         {['date', 'day', 'time'].map((field) => (
//           <input
//             key={field}
//             name={field}
//             value={formData[field as keyof Payment]}
//             onChange={handleInput}
//             placeholder={field.toUpperCase()}
//             className="border p-2 rounded w-full"
//           />
//         ))}
//         <input
//           name="workingPayment"
//           type="number"
//           value={formData.workingPayment}
//           onChange={handleInput}
//           placeholder="Payment"
//           className="border p-2 rounded w-full"
//         />
//         <button
//           onClick={handleAddPayment}
//           className="bg-gradient-to-r from-green-600 to-lime-500 transition- text-white px-4 py-2 rounded hover:bg-green-600 col-span-full flex items-center gap-2 justify-center"
//         >
//           <FloppyDisk size={18} />
//           Save Payment
//         </button>
//       </div>

//       {/* Month-wise Payment History */}
//       <h3 className="text-xl font-semibold mb-4">Payment History</h3>
//       {Object.entries(grouped).map(([month, monthPayments]) => {
//         const total = monthPayments.reduce((sum, p) => sum + p.workingPayment, 0);

//         return (
//           <div key={month} className="mb-8">
//             <h4 className="text-lg font-bold mb-2 text-gray-700">{month}</h4>
//             <div className="overflow-x-auto bg-white shadow rounded">
//               <table className="w-full table-auto border-collapse text-sm">
//                 <thead className="bg-zinc-300">
//                   <tr>
//                     <th className="p-2 text-center font-light">Date</th>
//                     <th className="p-2 text-center font-light">Day</th>
//                     <th className="p-2 text-center font-light">Time</th>
//                     <th className="p-2 text-center font-light">Payment</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {monthPayments.map((p, i) => (
//                     <tr key={i} className="border-t hover:bg-lime-100">
//                       <td className="p-2 text-center">{p.date}</td>
//                       <td className="p-2 text-center">{p.day}</td>
//                       <td className="p-2 text-center">{p.time}</td>
//                       <td className="p-2 text-center">Rs. {p.workingPayment}</td>
//                     </tr>
//                   ))}
//                   <tr className="bg-gray-100 font-semibold">
//                     <td className="p-2 text-center" colSpan={3}>
//                       Monthly Total
//                     </td>
//                     <td className="p-2 text-center">Rs. {total}/-</td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// }

































//-----------------------editable employee Dashboard----------------------------
'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import axios from 'axios';
import {
  EnvelopeSimple, Phone, IdentificationBadge,
  Buildings, ArrowLeft, FloppyDisk, PencilSimple,
  TrashSimple, DownloadSimple
} from "phosphor-react";
import toast from 'react-hot-toast';
import Button from '../components/Button';

interface Employee {
  fullName: string;
  email: string;
  phone: string;
  employeeId: string;
  department: string;
}

interface Payment {
  _id?: string;
  date: string;
  day: string;
  time: string;
  workingPayment: number;
}

export default function EmployeeDashboard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const employeeId = searchParams.get('employeeId');

  const [employee, setEmployee] = useState<Employee | null>(null);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState<Payment>({
    date: '',
    day: '',
    time: '',
    workingPayment: 0,
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const fetchEmployeeData = async () => {
    if (!employeeId) return;
    try {
      const [eRes, pRes] = await Promise.all([
        axios.get(`/api/employee/${employeeId}`),
        axios.get(`/api/employee/payments/${employeeId}`)
      ]);
      setEmployee(eRes.data);
      setPayments(pRes.data);
    } catch (err) {
      toast.error('Failed to fetch employee or payment data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployeeData();
  }, [employeeId]);

  const handleAddOrUpdatePayment = async () => {
    if (!employeeId) return;

    try {
      if (editingId) {
        // Update existing
        await axios.put(`/api/payment/${editingId}`, formData);
        toast.success('Payment updated!');
      } else {
        const res = await axios.post('/api/employee/payments/add', {
          ...formData,
          workingPayment: Number(formData.workingPayment),
          employeeId,
        });
        setPayments(prev => [...prev, res.data]);
        toast.success('Payment added!');
      }

      setFormData({ date: '', day: '', time: '', workingPayment: 0 });
      setEditingId(null);
      fetchEmployeeData();
    } catch (err) {
      toast.error('Failed to save/update payment');
    }
  };

  const handleEdit = (payment: Payment) => {
    setFormData(payment);
    setEditingId(payment._id || null);
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/payment/${id}`);
      toast.success('Payment deleted!');
      fetchEmployeeData();
    } catch {
      toast.error('Delete failed');
    }
  };

  const downloadCSV = () => {
    const csvRows = [
      ['Date', 'Day', 'Time', 'Working Payment'],
      ...payments.map(p => [p.date, p.day, p.time, p.workingPayment.toString()])
    ];
    const blob = new Blob([csvRows.map(e => e.join(",")).join("\n")], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `payment-history-${employee?.employeeId}.csv`;
    a.click();
  };

  const total = payments.reduce((sum, p) => sum + (p.workingPayment || 0), 0);

  if (loading) return <p>Loading...</p>;
  if (!employee) return <p className="text-red-500">Employee not found.</p>;

  const goHome = () => router.push('/');
  
  return (
    <div className="max-w-4xl mx-auto p-6">
      <Button
  onClick={goHome}
  icon={<ArrowLeft size={20} />}
  label="Back to Home"
  className="px-4 py-2 rounded-lg shadow bg-blue-600 hover:bg-blue-700"
/>

      <div className="p-6 shadow-md border rounded-xl mb-6 space-y-2">
        <h2 className="text-2xl font-bold">{employee.fullName}</h2>
        <p className="flex items-center gap-2 text-sm text-gray-700"><EnvelopeSimple size={18} className="text-indigo-500" />{employee.email}</p>
        <p className="flex items-center gap-2 text-sm text-gray-700"><Phone size={18} className="text-green-500" />{employee.phone}</p>
        <p className="flex items-center gap-2 text-sm text-gray-700"><IdentificationBadge size={18} className="text-blue-500" />Employee ID: {employee.employeeId}</p>
        <p className="flex items-center gap-2 text-sm text-gray-700"><Buildings size={18} className="text-yellow-600" />Department: {employee.department}</p>
      </div>

      <h3 className="font-semibold mb-3">{editingId ? 'Edit Payment' : 'Add New Payment'}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {['date', 'day', 'time'].map((field) => (
          <input
            key={field}
            name={field}
            value={formData[field as keyof Payment]}
            onChange={handleInput}
            placeholder={field.toUpperCase()}
            className="border p-2 rounded w-full"
          />
        ))}
        <input
          name="workingPayment"
          type="number"
          value={formData.workingPayment}
          onChange={handleInput}
          placeholder="Payment"
          className="border p-2 rounded w-full"
        />
        <button
          onClick={handleAddOrUpdatePayment}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 col-span-full flex items-center gap-2 justify-center"
        >
          <FloppyDisk size={18} />
          {editingId ? 'Update Payment' : 'Save Payment'}
        </button>
      </div>

      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold">Payment History</h3>
        <button onClick={downloadCSV} className="flex items-center gap-2 text-sm bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded">
          <DownloadSimple size={18} />
          Export CSV
        </button>
      </div>

      <div className="overflow-x-auto bg-white shadow rounded mb-4">
        <table className="w-full table-auto border-collapse text-sm">
          <thead className="bg-zinc-300">
            <tr>
              <th className="p-2 text-center font-light">Date</th>
              <th className="p-2 text-center font-light">Day</th>
              <th className="p-2 text-center font-light">Time</th>
              <th className="p-2 text-center font-light">Payment</th>
              <th className="p-2 text-center font-light">Actions</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((p, i) => (
              <tr key={i} className="border-t hover:bg-lime-100">
                <td className="p-2 text-center">{p.date}</td>
                <td className="p-2 text-center">{p.day}</td>
                <td className="p-2 text-center">{p.time}</td>
                <td className="p-2 text-center">Rs. {p.workingPayment}</td>
                <td className="p-2 text-center flex justify-center gap-3">
                  <button onClick={() => handleEdit(p)} className="text-blue-600 hover:underline inline-flex items-center gap-1">
                    <PencilSimple size={16} />
                    Edit
                  </button>
                  <button onClick={() => handleDelete(p._id!)} className="text-red-600 hover:underline inline-flex items-center gap-1">
                    <TrashSimple size={16} />
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            <tr className="bg-gray-100 font-semibold">
              <td className="p-2 text-center" colSpan={3}>Total</td>
              <td className="p-2 text-center">Rs. {total}/-</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

