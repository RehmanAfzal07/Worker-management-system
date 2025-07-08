import { connectDB } from '../../../lib/db';
import { Employee } from '../../../models/employeeModel';
import { NextResponse,NextRequest } from 'next/server';




export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();

    const user = await Employee.findOne({
      $or: [
        { username: body.username || body.employeeId },
        { employeeId: body.employeeId },
      ],
    });

    if (!user || user.password !== body.password) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    return NextResponse.json(user);
  } catch (err) {
    return NextResponse.json({ message: 'Error during login' }, { status: 500 });
  }
}


















// export async function POST(req: NextRequest) {
//   try {
//     await connectDB();
//     const body = await req.json();

//     const { employeeId, password } = body;

//     // Find by either employeeId or username (whichever matches)
//     const user = await Employee.findOne({
//       $or: [{ employeeId }, { username: employeeId }],
//     });

//     if (!user) {
//       return NextResponse.json({ message: 'Invalid credentials: user not found' }, { status: 401 });
//     }

//     // Compare password directly (in real apps use bcrypt)
//     if (user.password !== password) {
//       return NextResponse.json({ message: 'Invalid credentials: wrong password' }, { status: 401 });
//     }

//     return NextResponse.json({
//       message: 'Login successful',
//       employeeId: user.employeeId,
//       username: user.username,
//       fullName: user.fullName,
//     });

//   } catch (err) {
//     console.error('Login error:', err);
//     return NextResponse.json({ message: 'Error during login' }, { status: 500 });
//   }
// }










