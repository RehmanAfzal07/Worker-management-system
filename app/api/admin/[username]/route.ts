import { connectDB } from '../../../lib/db';
import { Admin } from '../../../models/adminModel';
import { NextResponse } from 'next/server';

export async function GET(req: Request, { params }: { params: { username: string } }) {
  try {
    await connectDB();
    const admin = await Admin.findOne({ username: params.username });

    if (!admin) {
      return NextResponse.json({ message: 'Admin not found' }, { status: 404 });
    }

    return NextResponse.json(admin);
  } catch (error) {
    console.error('Error fetching admin:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
