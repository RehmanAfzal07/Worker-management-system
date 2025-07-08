import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '../../../../lib/db';
import Payment from '../../../../models/paymentModel';


export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const payments = await Payment.find({ employeeId: params.id }).sort({ date: -1 });

    return NextResponse.json(payments);
  } catch (err) {
    console.error('Payment GET error:', err);
    return NextResponse.json({ message: 'Failed to fetch payments' }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  await connectDB();
  try {
    await Payment.findByIdAndDelete(params.id);
    return NextResponse.json({ message: 'Deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
  }
}
