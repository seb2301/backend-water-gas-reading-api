/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
              protocol: 'https',
              hostname: 'shorturl.at',
              port: '',
              pathname: '/**',
            },
          ],
    },
    output: 'standalone',
};

export default nextConfig;
