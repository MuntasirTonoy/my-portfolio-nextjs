import { isValidObjectId } from "mongoose";
import connectDB from "@/lib/db";
import User from "@/models/User";
import { verifyResetToken } from "@/lib/auth";
import { json, fail, handleError, clientIp, passwordError } from "@/lib/http";
import { rateLimit, MINUTE } from "@/lib/rateLimit";

const INVALID_LINK = "Password reset link is invalid or has expired";

export async function POST(req) {
  const limited = rateLimit(`reset:${clientIp(req)}`, { limit: 5, windowMs: 15 * MINUTE });
  if (!limited.ok) return fail("Too many requests. Try again later.", 429);

  try {
    const { id, token, password } = await req.json();

    const error = passwordError(password);
    if (error) return fail(error);
    if (!isValidObjectId(id) || typeof token !== "string") return fail(INVALID_LINK);

    await connectDB();
    const user = await User.findById(id);
    if (!user || !verifyResetToken(token, user)) return fail(INVALID_LINK);

    user.password = password;
    await user.save();

    return json({ message: "Password reset successful. You can now log in." });
  } catch (error) {
    return handleError("Reset password error", error);
  }
}
