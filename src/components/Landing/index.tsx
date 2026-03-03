"use client";

import styles from './style.module.scss';
import Image from 'next/image';
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function Landing() {
    const imageRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!imageRef.current) return;


        gsap.to(imageRef.current, {
            clipPath: "inset(0% round 10px)",
            ease: "none",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "bottom bottom",
                scrub: true,
                invalidateOnRefresh: true,
            }
        });
    }, { scope: containerRef });

    return (
        <section className={styles.landing} ref={containerRef}>
            <div className={styles.heading}>
                <h1>Saurow</h1>
            </div>

            <div className={styles.text}>
                <p>
                    <span className={styles.lineOne}>
                        Building for the web,
                    </span>
                    <br />
                    <span className={styles.lineTwo}>
                        Crafting motion rich web experiences.
                    </span>
                </p>
            </div>

            <div className={styles.imageContainer} ref={imageRef}>
                <Image src="/images/rooftop.jpg" alt="image" fill priority />
            </div>
        </section>
    );
}