"use client";

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './second.module.scss';

gsap.registerPlugin(SplitText, ScrollTrigger, useGSAP);

export default function Second() {
    const scopeRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const leadRef = useRef<HTMLParagraphElement>(null);

    useGSAP(() => {
        const titleSplit = SplitText.create(titleRef.current!, {
            type: "chars",
            charsClass: styles.char
        });

        const leadSplit = SplitText.create(leadRef.current!, {
            type: "lines",
            linesClass: styles.lineInner
        });

        leadSplit.lines.forEach(line => {
            const mask = document.createElement('div');
            mask.className = styles.lineMask;
            line.parentNode?.insertBefore(mask, line);
            mask.appendChild(line);
        });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: scopeRef.current,
                start: "top 75%",
                toggleActions: "play none none none"
            }
        });

        tl.from(titleSplit.chars, {
            yPercent: 100,
            duration: 0.8,
            ease: "power4.out",
            stagger: 0.02
        })
            .from(leadSplit.lines, {
                yPercent: 110,
                duration: 0.9,
                ease: "power4.out",
                stagger: 0.05
            }, "-=0.4");

        return () => {
            titleSplit.revert();
            leadSplit.revert();
        };
    }, { scope: scopeRef });

    return (
        <section className={styles.secondPage} ref={scopeRef}>
            <div className={styles.inner}>
                <div className={styles.titleContainer}>
                    <h1 ref={titleRef} className={styles.title}>Crafting Digital Experiences</h1>
                </div>
                <p ref={leadRef} className={styles.lead}>
                    I create immersive websites that blend thoughtful design, fluid motion, and modern frontend engineering.
                    Every project is built with performance, accessibility, and scalability in mind, using Next.js,
                    TypeScript, GSAP, ThreeJs and WebGL to deliver experiences that feel fast, polished, and memorable.
                </p>
            </div>
        </section>
    );
}