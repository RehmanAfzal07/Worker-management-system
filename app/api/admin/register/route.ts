// src/app/api/admin/register/route.ts
import { connectDB } from '../../../lib/db';
import { Admin } from '../../../models/adminModel';
import { NextResponse,NextRequest } from 'next/server';



export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();

    const existing = await Admin.findOne({ username: body.username });
    if (existing) {
      return NextResponse.json({ message: 'Username already exists' }, { status: 409 });
    }

    const newAdmin = await Admin.create({
      fullName: body.fullName,
      email: body.email,
      phone: body.phone,
      username: body.username,
      password: body.password,
    });

    return NextResponse.json({ message: 'Admin registered', admin: newAdmin }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: 'Failed to register admin' }, { status: 500 });
  }
}





















// export async function POST(req: Request) {
//   try {
//     await connectDB();
//     const body = await req.json();
//     const existing = await Admin.findOne({ username: body.username });

//     if (existing) {
//       return NextResponse.json({ message: 'Admin already exists' }, { status: 400 });
//     }

//     const newAdmin = await Admin.create(body);
//     return NextResponse.json(newAdmin, { status: 201 });
//   } catch (error) {
//     return NextResponse.json({ error: 'Failed to register admin' }, { status: 500 });
//   }
// }