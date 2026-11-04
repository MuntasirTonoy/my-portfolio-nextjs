import jwt from "jsonwebtoken";
import connectDB from "@/lib/db";
import User from "@/models/User";
import { AUTH_COOKIE, jwtSecret, readSession } from "@/lib/session";

export {
  AUTH_COOKIE,
  readSession,
  signSession,
  setSessionCookie,
  clearSessionCookie,
} from "@/lib/session";

/** Resolves the logged-in admin from the session cookie, or null. */
export async function verifyAuth(req) {
  const session = readSession(req.cookies.get(AUTH_COOKIE)?.value);
  if (!session) return null;

  await connectDB();
  return User.findById(session.id).select("-password");
}

// Password-reset tokens are signed with the current password hash, so they
// stop working as soon as the password changes (single use).
export const signResetToken = (user) =>
  jwt.sign({ id: String(user._id) }, jwtSecret() + user.password, { expiresIn: "15m" });

export function verifyResetToken(token, user) {
  try {
    jwt.verify(token, jwtSecret() + user.password);
    return true;
  } catch {
    return false;
  }
}
