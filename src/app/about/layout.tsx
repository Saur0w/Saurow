import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'About - Saurow',
    description: 'Learn about Saurow, a 22-year-old front-end developer from India specializing in Next.js, GSAP animations, and modern web experiences. Passionate about crafting pixel-perfect interfaces and smooth micro-interactions.',
    keywords: [
        'Saurow',
        'Front-end Developer',
        'Web Developer',
        'Next.js Developer',
        'GSAP Animations',
        'React Developer',
        'UI/UX Designer',
        'JavaScript Developer',
        'TypeScript',
        'India',
        'Portfolio',
        'Web Designer',
        'Frontend Engineer',
        'Modern Web Development',
        'Responsive Design',
        'Web Animations'
    ],
    authors: [{ name: 'Saurow', url: 'https://saurow.dev' }],
    creator: 'Saurow',
    publisher: 'Saurow',
    alternates: {
        canonical: '/about',
    },
    openGraph: {
        title: 'About Saurow - Front-End Developer & Creative Technologist',
        description: 'Discover the story behind Saurow, a passionate front-end developer from India who brings designs to life through pixel-perfect precision and smooth animations.',
        url: '/about',
        siteName: 'Saurow Portfolio',
        locale: 'en_US',
        type: 'profile',
        images: [
            {
                url: '/og/about-og.jpg', // You'll need to create this image
                width: 1200,
                height: 630,
                alt: 'Saurow - Front-End Developer Profile',
                type: 'image/jpeg',
            }
        ],
    },


    category: 'technology',
    classification: 'Portfolio Website',
    referrer: 'origin-when-cross-origin',
    colorScheme: 'dark light',
    themeColor: [
        { media: '(prefers-color-scheme: light)', color: '#f7f7f7' },
        { media: '(prefers-color-scheme: dark)', color: '#151515' }
    ],
    viewport: {
        width: 'device-width',
        initialScale: 1,
        maximumScale: 1,
        userScalable: false,
    },
    icons: {
        icon: [
            { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
            { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
        ],
        apple: [
            { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
        ],
        other: [
            {
                rel: 'mask-icon',
                url: '/safari-pinned-tab.svg',
                color: '#151515'
            }
        ]
    },
    manifest: '/manifest.json',
    other: {
        'application-name': 'Saurow Portfolio',
        'apple-mobile-web-app-title': 'Saurow',
        'apple-mobile-web-app-capable': 'yes',
        'apple-mobile-web-app-status-bar-style': 'black-translucent',
        'format-detection': 'telephone=no',
        'mobile-web-app-capable': 'yes',
        'msapplication-TileColor': '#151515',
        'msapplication-tap-highlight': 'no',
        'theme-color': '#151515',
        'color-scheme': 'dark light'
    }
}

export default function AboutLayout({
                                        children,
                                    }: {
    children: React.ReactNode
}) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'Person',
                        '@id': 'https://saurow.dev/about#person',
                        name: 'Saurow',
                        alternateName: '@Saurow',
                        description: 'Front-end developer from India specializing in Next.js, GSAP animations, and modern web experiences',
                        url: 'https://saurow.dev',
                        image: 'https://saurow.dev/og/about-og.jpg',
                        sameAs: [
                            'https://github.com/saurow',
                            'https://linkedin.com/in/saur0w',
                            'https://twitter.com/saur0w'
                        ],
                        jobTitle: 'Front-End Developer',
                        worksFor: {
                            '@type': 'Organization',
                            name: 'Freelance'
                        },
                        address: {
                            '@type': 'PostalAddress',
                            addressCountry: 'IN',
                            addressRegion: 'Uttarakhand'
                        },
                        knowsAbout: [
                            'JavaScript',
                            'TypeScript',
                            'React',
                            'Next.js',
                            'GSAP',
                            'Web Development',
                            'Frontend Development',
                            'UI/UX Design',
                            'Web Animations',
                            'Responsive Design'
                        ],
                        alumniOf: {
                            '@type': 'EducationalOrganization',
                            name: 'BTech Computer Science'
                        },
                        birthPlace: {
                            '@type': 'Place',
                            name: 'India'
                        },
                        nationality: 'Indian',
                        gender: 'Male'
                    })
                }}
            />
            {children}
        </>
    )
}
