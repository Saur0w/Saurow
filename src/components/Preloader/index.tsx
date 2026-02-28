"use client";

import styles from './style.module.scss';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { useRef } from "react";

export default function Preloader() {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);
    const counterRef = useRef<HTMLDivElement>(null);

    const counterValue = { val: 0 };

    useGSAP(() => {
        const tl = gsap.timeline();

        tl.to(counterValue, {
            val: 100,
            duration: 1.5,
            ease: "power2.inOut",
            onUpdate: () => {
                if (counterRef.current) {
                    counterRef.current.innerText = `${Math.floor(counterValue.val)}%`;
                }
            }
        });

        tl.from(textRef.current, {
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out"
        }, "-=0.5");

        // 3. Exit Animation (Slide Up)
        tl.to(containerRef.current, {
            yPercent: -100,
            duration: 1.2,
            ease: "power4.inOut",
            delay: 0.5 // Wait a moment after name reveals
        });

        // Optional: Hide container after animation to prevent click blocking
        tl.set(containerRef.current, { display: "none" });

    }, { scope: containerRef });

    return (
        <div className={styles.preloader} ref={containerRef}>
            <div className={styles.content}>
                <h1 ref={textRef} className={styles.title}>
                    <span>Saurow</span>
                </h1>
                <div className={styles.counter} ref={counterRef}>
                    0%
                </div>
            </div>
        </div>
    );
}
