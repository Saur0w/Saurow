import { ViewTransitions } from "next-view-transitions";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Preloader from '@/components/Preloader/index';
import Header from '@/components/Header/index';

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Saurow",
    description: "Portfolio of saurow",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ViewTransitions>
            <html lang="en">
            <head>
                <link
                    href="https://api.fontshare.com/v2/css?f[]=clash-display@600,700&f[]=general-sans@500,600&f[]=space-mono@400,700&display=swap"
                    rel="stylesheet"
                />
            </head>
            <body className={`${geistSans.variable} ${geistMono.variable}`}>
            <Preloader />
            <Header />
            {children}
            </body>
            </html>
        </ViewTransitions>
    );
}
