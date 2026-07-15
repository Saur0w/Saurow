"use client";

import { TransitionRouter } from "next-transition-router";
import React, { useRef } from "react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(CustomEase, useGSAP, SplitText);
CustomEase.create("hop", "0.9, 0, 0.1, 1");

const ROWS = 4;

export default function PageTransition({ children }: { children: React.ReactNode }) {
    const gridRef = useRef<HTMLDivElement>(null);
    const blockRef = useRef<(HTMLDivElement | null)[]>([]);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const wordsRef = useRef<HTMLElement[]>([]);
    const splitRef = useRef<SplitText | null>(null);

    useGSAP(() => {
        if (!headingRef.current) return;

        splitRef.current = new SplitText(headingRef.current, {
            type: "words",
            wordsClass: "word",
            mask: "words",
        });

        wordsRef.current = splitRef.current.words as HTMLElement[];
        gsap.set(wordsRef.current, { y: "100%" });

        return () => {
            splitRef.current?.revert();
        };
    }, { scope: headingRef });

    const animateIn = (onComplete: () => void) => {
        const tl = gsap.timeline({ onComplete });

        tl.set(blockRef.current, {
            transformOrigin: "left center",
            scaleX: 0,
        });

        tl.set(wordsRef.current, { y: "100%" });

        tl.to(blockRef.current, {
            duration: 1,
            scaleX: 1,
            ease: "hop",
            stagger: 0.075,
        });

        tl.to(wordsRef.current, {
            y: "0%",
            duration: 1,
            ease: "power4.out",
            stagger: 0.1,
        }, "-=0.6");

        return tl;
    };

    const animateOut = (onComplete: () => void) => {
        const tl = gsap.timeline({ onComplete });

        tl.set(blockRef.current, {
            transformOrigin: "right center",
            scaleX: 1,
        });

        tl.to(wordsRef.current, {
            y: "100%",
            duration: 1,
            ease: "power4.out",
            stagger: 0.1,
        });

        tl.to(blockRef.current, {
            duration: 1,
            scaleX: 0,
            ease: "hop",
            stagger: 0.075,
        }, "-=1");

        return tl;
    };

    return (
        <TransitionRouter
            auto
            leave={(next) => {
                const tl = animateIn(next);
                return () => tl.kill();
            }}
            enter={(next) => {
                const tl = animateOut(next);
                return () => tl.kill();
            }}
        >
            <div ref={gridRef} className="transition-grid">
                {Array.from({ length: ROWS }).map((_, i) => (
                    <div
                        key={i}
                        className="transition-block"
                        ref={(el) => { blockRef.current[i] = el; }}
                    />
                ))}
            </div>

            <div className="transition-text">
                <h1 ref={headingRef}>Saurow</h1>
            </div>
            {children}
        </TransitionRouter>
    );
}