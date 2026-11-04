import connectDB from "@/lib/db";
import Review from "@/models/Review";
import { verifyAuth } from "@/lib/auth";
import { revalidateReviews } from "@/lib/portfolio";
import { json, fail, handleError } from "@/lib/http";

export async function PUT(req, { params }) {
  try {
    if (!(await verifyAuth(req))) return fail("Not authorized", 401);

    const { id } = await params;
    const { isPublished } = await req.json();
    if (typeof isPublished !== "boolean") return fail("isPublished must be a boolean");

    await connectDB();
    const review = await Review.findByIdAndUpdate(id, { isPublished }, { new: true });
    if (!review) return fail("Review not found", 404);

    revalidateReviews();
    return json(review);
  } catch (error) {
    return handleError("Update review error", error);
  }
}

export async function DELETE(req, { params }) {
  try {
    if (!(await verifyAuth(req))) return fail("Not authorized", 401);

    const { id } = await params;
    await connectDB();
    const review = await Review.findByIdAndDelete(id);
    if (!review) return fail("Review not found", 404);

    revalidateReviews();
    return json({ message: "Review removed" });
  } catch (error) {
    return handleError("Delete review error", error);
  }
}
