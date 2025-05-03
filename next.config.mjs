// next.config.mjs
const nextConfig = {
  images: {
    domains: [
      'api.microlink.io', // Microlink Image Preview
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.ibb.co.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  experimental: {
    // Add this to handle params in client components properly
    missingSuspenseWithCSRBailout: false,
  },
}

export default nextConfig;
