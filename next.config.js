const nextConfig = {
  images: {
    domains: ["images.unsplash.com"],
  },
  eslint: {
    // Allows production builds to complete even if there are lint errors
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Allows production builds to complete even if there are type errors
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig

