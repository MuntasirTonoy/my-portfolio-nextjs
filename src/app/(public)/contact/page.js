import ContactClient from "./ContactClient";

export const metadata = {
  title: "Contact",
  alternates: { canonical: "/contact" },
  description: "Get in touch with Md Muntasir Mahmud (Tonoy) for custom web development services, project collaborations, or consultation.",
  keywords: [
    "Contact Md Muntasir Mahmud",
    "Hire Tonoy",
    "Full-Stack Developer Contact",
    "Web Developer Bangladesh",
    "Freelance React Developer",
    "Next.js Consultant"
  ],
};

export default function ContactPage() {
  return <ContactClient />;
}
