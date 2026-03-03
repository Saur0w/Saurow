"use client";

import React, { useRef } from 'react';
import styles from './style.module.scss';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Magnetic from "@/ui/Magnetic/index";
import Link from 'next/link';

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

export default function Description() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!containerRef.current) return;

        const split = new SplitText(".reveal-text", {
            type: "lines",
            linesClass: "line-outer",
        });

        split.lines.forEach((line) => {
            const inner = document.createElement("div");
            inner.className = "line-inner";
            while (line.firstChild) {
                inner.appendChild(line.firstChild);
            }
            line.appendChild(inner);
        });

        const lineInners = containerRef.current.querySelectorAll<HTMLElement>(".line-inner");
        const socialInners = containerRef.current.querySelectorAll<HTMLElement>(".social-inner");

        gsap.from(lineInners, {
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 50%",
                toggleActions: "play none none reverse",
            },
            yPercent: 110,
            duration: 1,
            stagger: 0.12,
            ease: "power4.out",
        });

        gsap.from(socialInners, {
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 50%",
                toggleActions: "play none none reverse",
            },
            yPercent: 110,
            duration: 0.8,
            stagger: 0.08,
            ease: "power3.out",
            delay: 0.55,
        });

    }, { scope: containerRef });

    return (
        <section className={styles.description} ref={containerRef}>
            <div className={styles.content}>
                <p className={`reveal-text ${styles.text}`}>
                    Hi,<br /> I’m Saurabh Thapliyal!  A frontend developer creating clean, <br />
                    modern websites that are fast, responsive, and enhanced with smooth animations.
                </p>

                <div className={styles.socials}>
                    {[
                        { href: "https://x.com/sauroww", label: "X" },
                        { href: "https://www.linkedin.com/in/saurabh-thapliyal-76a0a6306/", label: "LinkedIn" },
                        { href: "https://github.com/Saur0w", label: "GitHub" },
                        { href: "https://www.behance.net/saurabhthapliy2", label: "Behance" },
                        { href: "https://dribbble.com/sthapliyal085", label: "Dribbble" }
                    ].map(({ href, label }) => (

                        <div className={`social-mask ${styles.socialMask}`} key={label}>
                            <div className="social-inner">
                                <Magnetic>
                                    <Link
                                        href={href}
                                        target="_blank"
                                        rel="noreferrer"
                                        className={styles.socialLink}
                                    >
                                        {label}
                                    </Link>
                                </Magnetic>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}