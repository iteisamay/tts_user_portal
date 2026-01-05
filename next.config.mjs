/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '10.10.20.199',
        port: '5050', 
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
