import { notFound } from "next/navigation";
import ProjectDetails from "./ProjectDetailsClient";
import { getPortfolio, getProject } from "@/lib/portfolio";

// Pre-render every known project; new ones render on first visit.
export async function generateStaticParams() {
  const { projects } = await getPortfolio();
  return projects.map((p) => ({ id: p._id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const project = await getProject(id);
  if (!project) return { title: "Project not found" };

  const description =
    project.description ||
    `Detailed view of the project ${project.title} built with modern web technologies.`;

  return {
    title: project.title,
    description,
    alternates: { canonical: `/project/${id}` },
    openGraph: {
      title: project.title,
      description,
      images: project.image ? [{ url: project.image }] : undefined,
    },
  };
}

export default async function ProjectDetailsPage({ params }) {
  const { id } = await params;
  const project = await getProject(id);
  if (!project) notFound();

  return <ProjectDetails project={project} />;
}
