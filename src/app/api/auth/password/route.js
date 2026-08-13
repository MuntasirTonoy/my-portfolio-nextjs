import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/models/User';
import { verifyAuth } from '@/lib/auth';

export async function PUT(req) {
  try {
    const userFromToken = await verifyAuth(req);
    if (!userFromToken) {
      return NextResponse.json({ message: 'Not authorized' }, { status: 401 });
    }

    await connectDB();
    const { currentPassword, newPassword, newEmail } = await req.json();
    const user = await User.findById(userFromToken._id);

    if (user && (await user.matchPassword(currentPassword))) {
      if (newPassword) user.password = newPassword;
      if (newEmail) user.email = newEmail;

      await user.save();
      return NextResponse.json({
        message: 'Account updated successfully',
        user: {
          _id: user._id,
          email: user.email
        }
      });
    } else {
      return NextResponse.json({ message: 'Invalid current password' }, { status: 401 });
    }
  } catch (error) {
    console.error('Update password error:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
