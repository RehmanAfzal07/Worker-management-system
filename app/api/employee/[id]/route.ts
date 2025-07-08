import { NextResponse,NextRequest } from 'next/server';
import {connectDB} from '../../../lib/db';
import Employee from '../../../models/Employee';




export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const employee = await Employee.findOne({ employeeId: params.id }); // ✅ must match field
    if (!employee) {
      return NextResponse.json({ message: 'Employee not found' }, { status: 404 });
    }

    return NextResponse.json(employee);
  } catch (err) {
    console.error('Employee GET error:', err);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}









// export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
//   await connectDB();
//   const employee = await Employee.findOne({ employeeId: params.id });
//   if (!employee) return NextResponse.json({ error: 'Not found' }, { status: 404 });
//   return NextResponse.json(employee);
// }
