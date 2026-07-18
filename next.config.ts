import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.jsdelivr.net',
        pathname: '/gh/devicons/**',
      },
      {
        protocol: 'https',
        hostname: 'vitejs.dev',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'vitest.dev',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        pathname: '/**',
      },
    ],
  },

  outputFileTracingIncludes: {
    '/**': ['./scripts/**/*'],
  },
};

export default nextConfig;
