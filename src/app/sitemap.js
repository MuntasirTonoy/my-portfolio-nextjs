import { getPortfolio } from "@/lib/portfolio";
import { SITE_URL } from "@/lib/site";

export const revalidate = 3600;

export default async function sitemap() {
  const { projects } = await getPortfolio();

  const pages = ["", "/about", "/projects", "/contact"].map((path) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.8,
  }));

  const projectPages = projects.map((p) => ({
    url: `${SITE_URL}/project/${p._id}`,
    lastModified: p.updatedAt ? new Date(p.updatedAt) : undefined,
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...pages, ...projectPages];
}
