import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import connectDB from '@/lib/db';
import User from '@/models/User';
import sendEmail from '@/lib/emailService';

export async function POST(req) {
  try {
    await connectDB();
    const { email } = await req.json();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: 'User not found with this email' }, { status: 404 });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET + user.password,
      { expiresIn: '15m' }
    );

    const frontendUrl = process.env.FRONTEND_URL || req.headers.get('origin') || 'https://www.muntasirmahmud.com';
    const resetUrl = `${frontendUrl}/admin/reset-password?token=${token}&id=${user._id}`;

    const subject = 'Password Reset Request';
    const text = `You requested a password reset for your portfolio admin account.\n\nPlease visit the link below:\n${resetUrl}\n`;
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff; color: #1e293b;">
        <h2 style="color: #02b677; text-align: center; margin-bottom: 24px;">Reset Your Password</h2>
        <p>Hello,</p>
        <p>We received a request to reset the password for your Portfolio Admin Panel account. Click the button below to set a new password:</p>
        <div style="text-align: center; margin: 32px 0;">
          <a href="${resetUrl}" style="background-color: #02b677; color: white; padding: 12px 28px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block; box-shadow: 0 4px 12px rgba(2,182,119,0.25);">Reset Password</a>
        </div>
        <p>This password reset link will expire in <strong>15 minutes</strong>.</p>
        <p>If you did not request a password reset, you can safely ignore this email.</p>
        <p>Best regards,<br/>Portfolio Admin Team</p>
      </div>
    `;

    await sendEmail({ email: user.email, subject, text, html });

    return NextResponse.json({ message: 'Password reset email sent successfully' });
  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json({ message: 'Error sending reset email' }, { status: 500 });
  }
}
