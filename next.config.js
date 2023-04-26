/** @type {import('next').NextConfig} */

const nextConfig = {

    reactStrictMode: false,
    swcMinify: true,
    compiler: {
        removeConsole: process.env.NODE_ENV !== "development",
    },
    experimental: {
        appDir: true
    },
    images: {
        domains: ['images.pexels.com', 'media.meds.se', 'i.ibb.co', 'lh3.googleusercontent.com', 'graph.facebook.com', 'cdn.snaptikvideo.com', 'media.instasupersave.com', 'scontent-lga3-1.xx.fbcdn.net', 'i.ytimg.com', 'media.videodownloaderpro.net', 'scontent.cdninstagram.com'], //your-external-link-hostname
        // hostname: ["images.pexels.com"]
    },
}

const withPWA = require("next-pwa")({
    dest: "public",
    disable: process.env.NODE_ENV === "development",
    register: true,
});

module.exports = withPWA(nextConfig)