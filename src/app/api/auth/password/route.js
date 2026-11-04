import connectDB from "@/lib/db";
import User from "@/models/User";
import { verifyAuth, signSession, setSessionCookie } from "@/lib/auth";
import { json, fail, handleError, isValidEmail, passwordError } from "@/lib/http";

export async function PUT(req) {
  try {
    const sessionUser = await verifyAuth(req);
    if (!sessionUser) return fail("Not authorized", 401);

    const { currentPassword, newPassword, newEmail } = await req.json();

    if (newPassword) {
      const error = passwordError(newPassword);
      if (error) return fail(error);
    }
    if (newEmail && !isValidEmail(newEmail)) {
      return fail("Please enter a valid email address");
    }

    await connectDB();
    const user = await User.findById(sessionUser._id);
    if (!user || !(await user.matchPassword(currentPassword || ""))) {
      return fail("Invalid current password", 401);
    }

    if (newPassword) user.password = newPassword;
    if (newEmail) user.email = newEmail;
    await user.save();

    const res = json({
      message: "Account updated successfully",
      user: { _id: user._id, email: user.email },
    });
    return setSessionCookie(res, signSession(user._id));
  } catch (error) {
    return handleError("Update account error", error);
  }
}
