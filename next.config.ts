// next.config.ts
import withMDX from '@next/mdx';
import type { NextConfig } from 'next';
import path from 'path';

const isDev = process.env.NODE_ENV === 'development';

const nextConfig: NextConfig = {
  reactStrictMode: true,

  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],

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

  webpack(config) {
    // 路径别名
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '@': path.resolve(__dirname, 'src'),
    };

    return config;
  },
};

export default withMDX({ extension: /\.mdx?$/ })(nextConfig);
