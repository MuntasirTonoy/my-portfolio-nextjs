import connectDB from "@/lib/db";
import User from "@/models/User";
import sendEmail from "@/lib/emailService";
import { signResetToken } from "@/lib/auth";
import { SITE_URL } from "@/lib/site";
import { json, fail, clientIp, isValidEmail } from "@/lib/http";
import { rateLimit, MINUTE } from "@/lib/rateLimit";

// Same response whether or not the account exists, so the endpoint can't be
// used to discover which emails are registered.
const GENERIC_RESPONSE = {
  message: "If that email belongs to an admin account, a reset link has been sent.",
};

const resetEmailHtml = (resetUrl) => `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff; color: #1e293b;">
    <h2 style="color: #02b677; text-align: center; margin-bottom: 24px;">Reset Your Password</h2>
    <p>Hello,</p>
    <p>We received a request to reset the password for your Portfolio Admin Panel account. Click the button below to set a new password:</p>
    <div style="text-align: center; margin: 32px 0;">
      <a href="${resetUrl}" style="background-color: #02b677; color: white; padding: 12px 28px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">Reset Password</a>
    </div>
    <p>This link expires in <strong>15 minutes</strong>.</p>
    <p>If you did not request a password reset, you can safely ignore this email.</p>
  </div>
`;

export async function POST(req) {
  const limited = rateLimit(`forgot:${clientIp(req)}`, { limit: 3, windowMs: 15 * MINUTE });
  if (!limited.ok) return fail("Too many requests. Try again later.", 429);

  try {
    const { email } = await req.json();
    if (!isValidEmail(email)) return fail("Please enter a valid email address");

    await connectDB();
    const user = await User.findByEmail(email);

    if (user) {
      // Built from server config only, never from request headers.
      const baseUrl = (process.env.FRONTEND_URL || SITE_URL).replace(/\/$/, "");
      const resetUrl = `${baseUrl}/admin/reset-password?token=${signResetToken(user)}&id=${user._id}`;

      await sendEmail({
        email: user.email,
        subject: "Password Reset Request",
        text: `You requested a password reset for your portfolio admin account.\n\nVisit this link (valid for 15 minutes):\n${resetUrl}\n`,
        html: resetEmailHtml(resetUrl),
      });
    }
  } catch (error) {
    // Logged, but the response stays generic.
    console.error("Forgot password error:", error);
  }

  return json(GENERIC_RESPONSE);
}
