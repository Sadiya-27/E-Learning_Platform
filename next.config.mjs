/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: 'utfs.io',
            }
        ]
    },
    videos: {
        remotePatterns: [
            {
                hostname: 'utfs.io',
            }
        ]
    }

};


export default nextConfig;
