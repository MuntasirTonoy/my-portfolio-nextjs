import { NextResponse } from "next/server";

export const json = (data, status = 200) => NextResponse.json(data, { status });

export const fail = (message, status = 400) =>
  NextResponse.json({ message }, { status });

/**
 * Logs the real error server-side and returns a safe response.
 * Mongoose validation/cast errors are the client's fault, so their
 * messages are returned with a 400; anything else becomes a generic 500.
 */
export const handleError = (context, error) => {
  if (error?.name === "ValidationError" || error?.name === "CastError") {
    return fail(error.message, 400);
  }
  if (error?.code === 11000) {
    return fail("A record with that value already exists", 409);
  }
  console.error(`${context}:`, error);
  return fail("Something went wrong. Please try again.", 500);
};

export const clientIp = (req) =>
  req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
  req.headers.get("x-real-ip") ||
  "unknown";

export const isValidEmail = (value) =>
  typeof value === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

export const MIN_PASSWORD_LENGTH = 8;

export const passwordError = (password) => {
  if (typeof password !== "string" || password.length < MIN_PASSWORD_LENGTH) {
    return `Password must be at least ${MIN_PASSWORD_LENGTH} characters`;
  }
  return null;
};
