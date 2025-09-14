import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    experimental: {
        viewTransition: true, // enable React's experimental View Transitions
    },
    transpilePackages: ["three"],
    // Optional niceties:
    // reactStrictMode: true,
    // swcMinify: true,
};

export default nextConfig;
