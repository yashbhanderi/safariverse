/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lkpjgfyfkwmalwvasxkt.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/camp-images/**",
      },
    ],
  },
  // output: "export"   // Only in production mode
};

export default nextConfig;