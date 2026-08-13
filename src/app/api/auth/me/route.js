import { NextResponse } from 'next/server';
import { verifyAuth } from '@/lib/auth';

export async function GET(req) {
  try {
    const user = await verifyAuth(req);
    if (!user) {
      return NextResponse.json({ message: 'Not authorized' }, { status: 401 });
    }
    return NextResponse.json(user);
  } catch (error) {
    console.error('Get user profile error:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
