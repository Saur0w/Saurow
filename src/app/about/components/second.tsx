"use client";

import styles from './second.module.scss';
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(SplitText, ScrollTrigger, useGSAP);

export default function Second() {
    const scopeRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const leadRef = useRef<HTMLParagraphElement>(null);

    useGSAP(() => {
        const titleSplit = SplitText.create(titleRef.current!, {
            type: "words,chars",
            wordsClass: "word++",
            charsClass: "char++"
        });

        gsap.from(titleSplit.chars, {
            yPercent: 110,
            opacity: 0,
            duration: 0.9,
            ease: "power4.out",
            stagger: 0.03,
            scrollTrigger: {
                trigger: scopeRef.current,
                start: "top 78%",
                once: true
            }
        });
        const leadSplit = SplitText.create(leadRef.current!, {
            type: "lines",
            linesClass: "line++",
            mask: "lines",
            autoSplit: true,
            onSplit(self) {
                gsap.set(self.lines, { display: "block" });

                const tl = gsap.from(self.lines, {
                    yPercent: 120,
                    opacity: 0,
                    duration: 0.8,
                    ease: "power4.out",
                    stagger: 0.12,
                    scrollTrigger: {
                        trigger: leadRef.current,
                        start: "top 80%",
                        end: "top 40%",
                        toggleActions: "play none none none",
                        once: true
                    }
                });

                return tl;
            }
        });

        const refresh = () => ScrollTrigger.refresh();
        document.fonts?.addEventListener?.("loadingdone", refresh);

        return () => {
            titleSplit.revert();
            leadSplit.revert();
            document.fonts?.removeEventListener?.("loadingdone", refresh);
        };
    }, { scope: scopeRef });

    return (
        <section className={styles.secondPage} ref={scopeRef}>
            <div className={styles.inner}>
                <h1 ref={titleRef} className={`${styles.title} ${styles.titleSplit}`}>What I do</h1>
                <p ref={leadRef} className={`${styles.lead} ${styles.leadSplit}`}>
                    Primary stack: Next.js with TypeScript, modular SCSS, and motion systems built with GSAP and Framer Motion.
                    Architecture favors clear component boundaries, typed contracts, and maintainability. Delivery focuses on
                    predictable state, accessible motion defaults, and progressive enhancement for scroll‑driven and route‑level
                    transitions.
                </p>
            </div>
        </section>
    );
}
