/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  serverActions: { allowedOrigins: ["xxxx.com", "localhost:3000"], },
  images: {
    domains: ["www.candere.com", "localhost", "picsum.photos","assets.angara.com"], // <== Domain name
  },
};

export default nextConfig;
