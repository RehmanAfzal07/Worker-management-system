import { connectDB } from '../../../lib/db';
import { Employee } from '../../../models/employeeModel';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectDB();
    const employees = await Employee.find();
    return NextResponse.json(employees);
  } catch (error) {
    console.error('Error fetching employees:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
