import { connectDB } from '../../../lib/db';
import { Employee } from '../../../models/employeeModel';
import { NextResponse } from 'next/server';



export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    // Check if username already exists
    const existing = await Employee.findOne({ username: body.username });
    if (existing) {
      return NextResponse.json({ message: 'Employee already exists' }, { status: 400 });
    }

    const newEmp = await Employee.create(body);
    return NextResponse.json(newEmp, { status: 201 });

  } catch (error) {
    console.error('Register Error:', error);
    return NextResponse.json({ message: 'Failed to register employee' }, { status: 500 });
  }
}
















// export async function POST(req: Request) {
//   try {
//     await connectDB();
//     const body = await req.json();
//     const existing = await Employee.findOne({ username: body.username });

//     if (existing) {
//       return NextResponse.json({ message: 'Employee already exists' }, { status: 400 });
//     }

//     const newEmp = await Employee.create(body);
//     return NextResponse.json(newEmp, { status: 201 });
//   } catch (error) {
//     return NextResponse.json({ error: 'Failed to register employee' }, { status: 500 });
//   }
// }