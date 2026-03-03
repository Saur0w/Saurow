"use client";

import styles from './style.module.scss';
import Image from 'next/image';
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

export default function Landing() {
    const imageRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLDivElement>(null);

    function getRandomColor() {
        const r = Math.floor(Math.random() * 255);
        const g = Math.floor(Math.random() * 255);
        const b = Math.floor(Math.random() * 255);
        return `rgb(${r}, ${g}, ${b})`;
    }

    useGSAP(() => {
        if (!imageRef.current || !headingRef.current) return;

        const split = new SplitText(headingRef.current, { type: "chars" });
        const delayedResets = new WeakMap<HTMLElement, gsap.core.Tween>();

        split.chars.forEach((char, index) => {
            const el = char as HTMLElement;

            el.addEventListener("mouseenter", () => {
                if (delayedResets.has(el)) {
                    delayedResets.get(el)!.kill();
                    delayedResets.delete(el);
                }

                const color = getRandomColor();

                // Primary char — punch up with stretch
                gsap.killTweensOf(el);
                gsap.timeline()
                    .to(el, {
                        y: -28,
                        scaleX: 0.85,
                        scaleY: 1.2,
                        color,
                        duration: 0.25,
                        ease: "power3.out",
                    })
                    .to(el, {
                        y: 0,
                        scaleX: 1,
                        scaleY: 1,
                        duration: 0.6,
                        ease: "elastic.out(1.1, 0.45)",
                    });

                // Ripple outward with decaying intensity
                const ripple = [
                    { offset: -1, strength: 0.55, delay: 0.04 },
                    { offset:  1, strength: 0.55, delay: 0.04 },
                    { offset: -2, strength: 0.28, delay: 0.09 },
                    { offset:  2, strength: 0.28, delay: 0.09 },
                    { offset: -3, strength: 0.12, delay: 0.14 },
                    { offset:  3, strength: 0.12, delay: 0.14 },
                ];

                ripple.forEach(({ offset, strength, delay }) => {
                    const neighbor = split.chars[index + offset] as HTMLElement | undefined;
                    if (!neighbor) return;

                    gsap.killTweensOf(neighbor);
                    gsap.timeline({ delay })
                        .to(neighbor, {
                            y: -28 * strength,
                            scaleX: 1 - 0.15 * strength,
                            scaleY: 1 + 0.2 * strength,
                            duration: 0.22,
                            ease: "power3.out",
                        })
                        .to(neighbor, {
                            y: 0,
                            scaleX: 1,
                            scaleY: 1,
                            duration: 0.55,
                            ease: "elastic.out(1, 0.4)",
                        });
                });
            });

            el.addEventListener("mouseleave", () => {
                const delayed = gsap.delayedCall(0.8, () => {
                    gsap.to(el, {
                        color: "#151515",
                        duration: 0.35,
                        ease: "power2.out",
                    });
                    delayedResets.delete(el);
                });
                delayedResets.set(el, delayed);
            });
        });

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

        return () => {
            split.chars.forEach((char) => {
                const el = char as HTMLElement;
                if (delayedResets.has(el)) {
                    delayedResets.get(el)!.kill();
                }
            });
        };
    }, { scope: containerRef });

    return (
        <section className={styles.landing} ref={containerRef}>
            <div className={styles.heading} ref={headingRef}>
                <h1>Saurow</h1>
            </div>
            <div className={styles.text}>
                <p>
                    <span className={styles.lineOne}>Building for the web,</span>
                    <br />
                    <span className={styles.lineTwo}>Crafting motion rich web experiences.</span>
                </p>
            </div>
            <div className={styles.imageContainer} ref={imageRef}>
                <Image src="/images/road.jpg" alt="image" fill priority />
            </div>
        </section>
    );
}