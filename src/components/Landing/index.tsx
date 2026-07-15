"use client";

import styles from './style.module.scss';
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { SplitText } from 'gsap/SplitText';
import TextCanvas from "./textCanvas";
import ImageCanvas from "./imageCanvas";

gsap.registerPlugin(ScrollTrigger, useGSAP, SplitText);

export default function Landing() {
    const imageRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!imageRef.current) return;
        const tl = gsap.timeline({ delay: 0.5 });

        tl.from(`.${styles.heading}`, {
            y: 80,
            opacity: 0,
            duration: 1.2,
            ease: "power4.out"
        });

        const splitText = new SplitText(`.${styles.text} p`, {
            type: "lines",
            linesClass: "split-parent"
        });
        const splitTextLines = new SplitText(splitText.lines, {
            type: "lines",
            linesClass: "split-child"
        });

        tl.from(splitTextLines.lines, {
            yPercent: 100,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
        }, "-=0.8");

        tl.from(imageRef.current, {
            y: 100,
            opacity: 0,
            scale: 0.95,
            duration: 1.0,
            ease: "power4.out",
        }, "-=0.6");

        gsap.to(imageRef.current, {
            clipPath: "inset(0% round 10px)",
            ease: "none",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "bottom bottom",
                scrub: true,
                invalidateOnRefresh: true,
            },
        });
    }, { scope: containerRef });

    return (
        <section className={styles.landing} ref={containerRef}>


            <div className={styles.heading}>
                <TextCanvas />
            </div>

            <div className={styles.text}>
                <p>
                    <span className={styles.lineOne}>Building for the web,</span>
                    <br />
                    <span className={styles.lineTwo}>Crafting motion rich web experiences.</span>
                </p>
            </div>

            <div className={styles.imageContainer} ref={imageRef}>
                <ImageCanvas />
            </div>
        </section>
    );
}