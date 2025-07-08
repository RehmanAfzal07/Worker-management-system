import { connectDB } from '../../../lib/db';
import { Admin } from '../../../models/adminModel';
import { NextResponse } from 'next/server';


export async function POST(req: Request) {
  try {
    await connectDB();
    const { username, password } = await req.json();

    const admin = await Admin.findOne({ username });

    if (!admin || admin.password !== password) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    // OPTIONAL: Update last login time
    admin.lastLogin = new Date();
    await admin.save();

    return NextResponse.json(admin); // return full admin data
  } catch (error) {
    return NextResponse.json({ message: 'Login failed' }, { status: 500 });
  }
}
















// export async function POST(req: Request) {
//   try {
//     await connectDB();
//     const body = await req.json();

//     const user = await Admin.findOne({ username: body.username });

//     if (!user || user.password !== body.password) {
//       return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
//     }

//     return NextResponse.json(user);
//   } catch (err) {
//     return NextResponse.json({ message: 'Error during login' }, { status: 500 });
//   }
// }