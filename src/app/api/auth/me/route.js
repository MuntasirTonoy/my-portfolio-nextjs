import { verifyAuth } from "@/lib/auth";
import { json, fail, handleError } from "@/lib/http";

export async function GET(req) {
  try {
    const user = await verifyAuth(req);
    if (!user) return fail("Not authorized", 401);
    return json({ _id: user._id, email: user.email });
  } catch (error) {
    return handleError("Get user profile error", error);
  }
}
