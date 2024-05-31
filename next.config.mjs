/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["www.candere.com", "localhost", "picsum.photos"], // <== Domain name
  },
};

export default nextConfig;
