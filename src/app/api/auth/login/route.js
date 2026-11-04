import connectDB from "@/lib/db";
import User from "@/models/User";
import { signSession, setSessionCookie } from "@/lib/auth";
import { json, fail, handleError, clientIp } from "@/lib/http";
import { rateLimit, MINUTE } from "@/lib/rateLimit";

export async function POST(req) {
  const limited = rateLimit(`login:${clientIp(req)}`, { limit: 5, windowMs: 15 * MINUTE });
  if (!limited.ok) return fail("Too many login attempts. Try again later.", 429);

  try {
    const { email, password } = await req.json();
    if (typeof email !== "string" || typeof password !== "string") {
      return fail("Email and password are required");
    }

    await connectDB();
    const user = await User.findByEmail(email);
    if (!user || !(await user.matchPassword(password))) {
      return fail("Invalid email or password", 401);
    }

    const res = json({ _id: user._id, email: user.email });
    return setSessionCookie(res, signSession(user._id));
  } catch (error) {
    return handleError("Login error", error);
  }
}
