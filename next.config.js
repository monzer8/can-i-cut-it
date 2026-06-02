/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
      // This allows production builds to successfully complete even if
      // there are minor TypeScript type-checking errors.
      ignoreBuildErrors: true,
    },
    eslint: {
      // This prevents linting warnings/errors from shutting down your build
      ignoreDuringBuilds: true,
    },
  }
  
  module.exports = nextConfig