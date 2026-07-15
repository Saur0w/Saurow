import type { Metadata } from "next";
import "./globals.css";
import Header from '@/components/Header/index';
import Footer from "@/components/Footer";
import React from "react";
import PageTransition from "@/lib/PageTransition";

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
        <html lang="en">
            <head>
                <link
                    href="https://api.fontshare.com/v2/css?f[]=clash-display@600,700&f[]=general-sans@500,600&f[]=space-mono@400,700&display=swap"
                    rel="stylesheet"
                />
                <title>Saurow Portfolio</title>
            </head>
            <body>
                <PageTransition>
                    <Header />
                    {children}
                    <Footer />
                </PageTransition>
            </body>
        </html>
    );
}
