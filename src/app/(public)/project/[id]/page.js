import ProjectDetails from "./ProjectDetailsClient";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://my-portfolio-backend-nine-psi.vercel.app/api";

async function getProject(id) {
  try {
    const res = await fetch(`${API_URL}/portfolio`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    const data = await res.json();
    const projects = data?.projects || [];
    return projects.find((p) => p._id === id || p.id?.toString() === id);
  } catch (error) {
    console.error("Failed to fetch project for metadata:", error);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const project = await getProject(id);
  
  if (!project) {
    return {
      title: "Project Details | Md Muntasir Mahmud (Tonoy)",
      description: "Explore this web development project in detail, showcasing design, technology stack, and features.",
    };
  }

  return {
    title: `${project.title} | Md Muntasir Mahmud (Tonoy)`,
    description: project.description || `Detailed view of the project ${project.title} built with modern web technologies.`,
    openGraph: {
      title: `${project.title} | Md Muntasir Mahmud (Tonoy)`,
      description: project.description,
      images: project.image ? [{ url: project.image }] : [],
    },
  };
}

export default function ProjectDetailsPage() {
  return <ProjectDetails />;
}
