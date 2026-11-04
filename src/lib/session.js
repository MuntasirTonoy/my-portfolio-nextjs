// JWT session helpers with no database dependency, so they can run in proxy.js.
import jwt from "jsonwebtoken";

export const AUTH_COOKIE = "admin_session";
const SESSION_SECONDS = 60 * 60 * 24; // 1 day

export function jwtSecret() {
  const value = process.env.JWT_SECRET;
  if (!value) throw new Error("JWT_SECRET is not set");
  return value;
}

export const signSession = (userId) =>
  jwt.sign({ id: String(userId) }, jwtSecret(), { expiresIn: SESSION_SECONDS });

/** Returns the decoded payload, or null if the token is missing/invalid/expired. */
export function readSession(token) {
  if (!token) return null;
  try {
    return jwt.verify(token, jwtSecret());
  } catch {
    return null;
  }
}

export function setSessionCookie(res, token) {
  res.cookies.set(AUTH_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: SESSION_SECONDS,
  });
  return res;
}

export function clearSessionCookie(res) {
  res.cookies.set(AUTH_COOKIE, "", { httpOnly: true, path: "/", maxAge: 0 });
  return res;
}
