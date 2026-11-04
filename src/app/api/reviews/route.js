import connectDB from "@/lib/db";
import Review from "@/models/Review";
import { verifyAuth } from "@/lib/auth";
import { getPublishedReviews } from "@/lib/portfolio";
import { json, fail, handleError, clientIp } from "@/lib/http";
import { rateLimit, HOUR } from "@/lib/rateLimit";

export async function GET(req) {
  try {
    const wantsAll = new URL(req.url).searchParams.get("all") === "true";
    if (!wantsAll) return json(await getPublishedReviews());

    // Unpublished reviews are only visible to the admin.
    if (!(await verifyAuth(req))) return fail("Not authorized", 401);
    const reviews = await Review.find().sort({ createdAt: -1 }).lean();
    return json(reviews);
  } catch (error) {
    return handleError("Fetch reviews error", error);
  }
}

export async function POST(req) {
  const limited = rateLimit(`review:${clientIp(req)}`, { limit: 3, windowMs: HOUR });
  if (!limited.ok) return fail("You've submitted several reviews recently. Please try again later.", 429);

  try {
    const { name, role, review, avatar, rating, website } = await req.json();

    // Honeypot: humans never see or fill the "website" field.
    if (website) return json({ message: "Thanks for your review!" }, 201);

    await connectDB();
    await Review.create({
      name,
      role,
      review,
      avatar: avatar || undefined,
      rating: Math.round(Number(rating)) || 5,
    });

    return json({ message: "Thanks! Your review will appear once it's approved." }, 201);
  } catch (error) {
    return handleError("Create review error", error);
  }
}
