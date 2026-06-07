"use client";

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import First from './components/first';
import Second from './components/second';
import { ReactLenis } from "lenis/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function AboutPage() {
    const pageRef = useRef<HTMLDivElement>(null);
    const firstRef = useRef<HTMLDivElement>(null);
    const secondRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.to(firstRef.current, {
            yPercent: 10,
            ease: "none",
            scrollTrigger: {
                trigger: firstRef.current,
                start: "top top",
                end: "bottom top",
                scrub: true,
                invalidateOnRefresh: true,
            }
        });

        gsap.from(secondRef.current, {
            yPercent: 0,
            ease: "none",
            scrollTrigger: {
                trigger: secondRef.current,
                start: "top bottom",
                end: "top center",
                scrub: true,
                invalidateOnRefresh: true,
            }
        })
    }, { scope: pageRef });
    return (
        <ReactLenis root>
            <div ref={pageRef}>
                <div ref={firstRef}>
                    <First />
                </div>
                <div ref={secondRef}>
                    <Second />
                </div>
            </div>
        </ReactLenis>
    );
}