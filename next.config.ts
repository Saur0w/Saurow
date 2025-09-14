import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
    eslint: {
        // Warning: Allows builds to pass even with ESLint errors
        ignoreDuringBuilds: true,
    },
}

export default nextConfig
