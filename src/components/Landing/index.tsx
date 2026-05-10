"use client";

import styles from './style.module.scss';
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import TextCanvas from "./textCanvas";
import ImageCanvas from "./imageCanvas";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Landing() {
    const imageRef     = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!imageRef.current) return;

        gsap.to(imageRef.current, {
            clipPath: "inset(0% round 10px)",
            ease: "none",
            scrollTrigger: {
                trigger : containerRef.current,
                start   : "top top",
                end     : "bottom bottom",
                scrub   : true,
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

            {/* ── WebGL image ── */}
            {/* imageRef lives on this div so GSAP clip-path still works.
                ImageCanvas fills it with position: absolute inset: 0.
                The shader does grayscale → colour on hover + FBM displacement. */}
            <div className={styles.imageContainer} ref={imageRef}>
                <ImageCanvas />
            </div>

        </section>
    );
}