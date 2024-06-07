/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["www.candere.com","t3.ftcdn.net", "res.cloudinary.com","localhost", "picsum.photos","assets.angara.com"], // <== Domain name
  },
};

export default nextConfig;
