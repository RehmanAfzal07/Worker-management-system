// /app/api/admin/employees-with-payments/route.ts
import { connectDB } from '../../../lib/db';
import { NextResponse } from 'next/server';
import {Employee} from '../../../models/employeeModel';
import Payment from '../../../models/paymentModel';

export async function GET() {
  try {
    await connectDB();

    const employees = await Employee.find();

    const employeeData = await Promise.all(
      employees.map(async (emp) => {
        const payments = await Payment.find({ employeeId: emp.employeeId });
        const total = payments.reduce((sum, p) => sum + (p.workingPayment || 0), 0);

        return {
          employee: emp,
          payments,
          total,
        };
      })
    );

    return NextResponse.json(employeeData);
  } catch (err) {
    return NextResponse.json({ message: 'Failed to load employees with payments' }, { status: 500 });
  }
}
