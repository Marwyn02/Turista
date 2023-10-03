/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "platform-lookaside.fbsbx.com",
      "azurlane.netojuu.com",
      "images.unsplash.com",
      "res.cloudinary.com",
    ],
    // loader: "cloudinary",
    // path: "https://res.cloudinary.com/dgzsmdvo4/image/upload/",
  },
};

module.exports = nextConfig;

// domains: [
//   "images.unsplash.com",
//   "assets.example.com",
//   "azurlane.netojuu.com",
//   "platform-lookaside.fbsbx.com",
//   "lh3.googleusercontent.com",
// ],
