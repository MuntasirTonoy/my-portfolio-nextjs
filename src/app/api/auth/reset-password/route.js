import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import connectDB from '@/lib/db';
import User from '@/models/User';

export async function POST(req) {
  try {
    await connectDB();
    const { id, token, password } = await req.json();

    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    try {
      jwt.verify(token, process.env.JWT_SECRET + user.password);
    } catch (err) {
      return NextResponse.json({ message: 'Password reset token is invalid or has expired' }, { status: 400 });
    }

    user.password = password;
    await user.save();

    return NextResponse.json({ message: 'Password reset successful. You can now log in.' });
  } catch (error) {
    console.error('Reset password error:', error);
    return NextResponse.json({ message: 'Server error during password reset' }, { status: 500 });
  }
}
