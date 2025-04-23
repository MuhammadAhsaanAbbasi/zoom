/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'http',
                hostname: '**.com',
                port: '',
                pathname: '/**',
            }
        ]
    }
};

export default nextConfig;
