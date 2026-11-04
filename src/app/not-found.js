import Button from "@/components/ui/Button";
import NotFoundAnimation from "@/components/ui/NotFoundAnimation";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 px-4 text-center">
      <NotFoundAnimation />
      <h1 className="text-3xl font-extrabold">
        <span className="text-spotify">404</span> · Page not found
      </h1>
      <p className="text-base-content/60 max-w-md">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Button href="/">Back to home</Button>
    </main>
  );
}
