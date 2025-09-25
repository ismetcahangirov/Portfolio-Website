/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "upload.wikimedia.org",
            },
            {
                protocol: "https",
                hostname: "cdn-icons-png.flaticon.com",
            },
            {
                protocol: "https",
                hostname: "img.icons8.com",
            },
            {
                protocol: "https",
                hostname: "www.svgrepo.com",
            },
            {
                protocol: "https",
                hostname: "cdn.worldvectorlogo.com",
            },
            {
                protocol: "https",
                hostname: "static.vecteezy.com",
            }
        ],
    },
};

export default nextConfig;
