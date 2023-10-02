/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "images.unsplash.com",
      "assets.example.com",
      "azurlane.netojuu.com",
      "platform-lookaside.fbsbx.com",
      "lh3.googleusercontent.com",
    ],
    loader: "cloudinary",
    path: "https://res.cloudinary.com/colbycloud-example/image/upload",
  },
};

module.exports = nextConfig;
