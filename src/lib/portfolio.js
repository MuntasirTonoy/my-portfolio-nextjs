// Server-side data access for the public site. Results are cached and
// invalidated by tag whenever the admin saves (see revalidatePortfolio).
import { unstable_cache, revalidateTag } from "next/cache";
import connectDB from "@/lib/db";
import Portfolio from "@/models/Portfolio";
import Project from "@/models/Project";
import Skill from "@/models/Skill";
import About from "@/models/About";
import Review from "@/models/Review";

export const PORTFOLIO_TAG = "portfolio";
export const REVIEWS_TAG = "reviews";

// Mongo documents contain ObjectIds/Dates; flatten them into plain JSON so
// they can be cached and passed to Client Components.
const toPlain = (value) => JSON.parse(JSON.stringify(value));

export async function loadPortfolio() {
  await connectDB();
  const [portfolio, projects, skills, about] = await Promise.all([
    Portfolio.findOne().lean(),
    Project.find().sort({ order: 1, createdAt: 1 }).lean(),
    Skill.find().sort({ order: 1, createdAt: 1 }).lean(),
    About.findOne().lean(),
  ]);

  return toPlain({
    ...(portfolio || {}),
    projects,
    skills,
    about: about || {},
  });
}

const cachedPortfolio = unstable_cache(loadPortfolio, ["portfolio"], {
  tags: [PORTFOLIO_TAG],
  revalidate: 3600,
});

const cachedReviews = unstable_cache(
  async () => {
    await connectDB();
    const reviews = await Review.find({ isPublished: true })
      .sort({ createdAt: -1 })
      .lean();
    return toPlain(reviews);
  },
  ["published-reviews"],
  { tags: [REVIEWS_TAG], revalidate: 3600 }
);

// Portfolio errors are NOT swallowed: a failed build is better than deploying
// an empty site, and at runtime ISR keeps serving the last good page if a
// background revalidation fails.
export const getPortfolio = () => cachedPortfolio();

// Reviews are non-critical; the home page still renders without them.
// The catch sits outside the cached function so an outage is never cached.
export async function getPublishedReviews() {
  try {
    return await cachedReviews();
  } catch (error) {
    console.error("Failed to load reviews:", error);
    return [];
  }
}

export async function getProject(id) {
  const { projects } = await getPortfolio();
  return projects.find((p) => p._id === id) || null;
}

// expire: 0 makes the admin's next page view show the change immediately.
export const revalidatePortfolio = () => revalidateTag(PORTFOLIO_TAG, { expire: 0 });
export const revalidateReviews = () => revalidateTag(REVIEWS_TAG, { expire: 0 });
