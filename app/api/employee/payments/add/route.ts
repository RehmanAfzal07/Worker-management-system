// app/api/employee/payments/add/route.ts
import { connectDB } from '../../../../lib/db';
import Payment from '../../../../models/paymentModel';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const newPayment = await Payment.create(body);
    return NextResponse.json(newPayment, { status: 201 });
  } catch (err) {
    console.error('Payment add error:', err);
    return NextResponse.json({ message: 'Failed to save payment' }, { status: 500 });
  }
}
