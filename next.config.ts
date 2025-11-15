import withMDX from '@next/mdx';

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.jsdelivr.net',
        port: '',
        pathname: '/gh/devicons/**',
      },
      {
        protocol: 'https',
        hostname: 'vitejs.dev',
        port: '',
        pathname: '/logo.svg',
      },
      {
        protocol: 'https',
        hostname: 'jd-opensource.github.io',
        port: '',
        pathname: '/micro-app/**',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
        pathname: '/u/**',
      },
    ],
  },
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  reactStrictMode: true,
};

export default withMDX({
  extension: /\.mdx?$/,
})(nextConfig);
