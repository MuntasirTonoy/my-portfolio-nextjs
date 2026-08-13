/** @type {import('next').NextConfig} */
const BACKEND_URL = "https://my-portfolio-backend-nine-psi.vercel.app/api";

const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${BACKEND_URL}/:path*`,
      },
    ];
  },
};

export default nextConfig;
