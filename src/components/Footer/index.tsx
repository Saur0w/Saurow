"use client";

import styles from './style.module.scss';
import { useRef } from "react";
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Magnetic from "@/ui/Magnetic/index";
import RoundedButton from "@/ui/FooterButtons/index";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function Footer() {
    const footerRef = useRef<HTMLElement>(null);
    const dotRef = useRef<HTMLSpanElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const buttonRef = useRef<HTMLDivElement>(null);
    const dividerRef = useRef<HTMLDivElement>(null);
    const navRef = useRef<HTMLDivElement>(null);
    const copyrightRef = useRef<HTMLDivElement>(null);
    const nav2Ref = useRef<HTMLDivElement>(null);
    const arrowRef = useRef<HTMLButtonElement>(null);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useGSAP(() => {
        const mm = gsap.matchMedia();

        mm.add(
            {
                isDesktop: '(min-width: 769px)',
                reduceMotion: '(prefers-reduced-motion: reduce)',
            },
            (context) => {
                const { isDesktop, reduceMotion } = context.conditions as {
                    isDesktop: boolean;
                    reduceMotion: boolean;
                };

                // Respect reduced-motion: skip animation entirely, just show final state
                if (reduceMotion) {
                    gsap.set(
                        [buttonRef.current, dividerRef.current, navRef.current,
                        copyrightRef.current, nav2Ref.current, arrowRef.current],
                        { clearProps: 'all' }
                    );
                    return;
                }

                const split = new SplitText(headingRef.current, { type: 'chars' });

                gsap.from(split.chars, {
                    scrollTrigger: { trigger: footerRef.current, start: 'top 80%' },
                    yPercent: 120,
                    opacity: 0,
                    duration: 0.85,
                    ease: 'expo.out',
                    stagger: 0.03,
                });

                // Dot — falls and bounces onto the "i"
                gsap.fromTo(dotRef.current,
                    { y: -100 },
                    {
                        scrollTrigger: { trigger: footerRef.current, start: 'top 80%' },
                        keyframes: {
                            "0%": { y: -100, scaleY: 1, scaleX: 1 },
                            "45%": { y: 0, scaleY: 0.5, scaleX: 1.6 },
                            "58%": { y: -30, scaleY: 1.1, scaleX: 0.9 },
                            "70%": { y: 0, scaleY: 0.75, scaleX: 1.25 },
                            "80%": { y: -12, scaleY: 1.05, scaleX: 0.95 },
                            "90%": { y: 0, scaleY: 0.9, scaleX: 1.1 },
                            "95%": { y: -4, scaleY: 1, scaleX: 1 },
                            "100%": { y: 0, scaleY: 1, scaleX: 1 },
                        },
                        duration: 1.6,
                        ease: 'power2.in',
                        transformOrigin: 'center bottom',
                        delay: 0.4,
                    }
                );

                // Email button slide up
                gsap.from(buttonRef.current, {
                    scrollTrigger: { trigger: footerRef.current, start: 'top 75%' },
                    y: 30,
                    opacity: 0,
                    duration: 0.9,
                    ease: 'expo.out',
                    delay: 0.25,
                });

                // Divider line draw
                gsap.from(dividerRef.current, {
                    scrollTrigger: { trigger: dividerRef.current, start: 'top 92%' },
                    scaleX: 0,
                    transformOrigin: 'left center',
                    duration: 1.2,
                    ease: 'expo.inOut',
                });

                // Bottom row stagger
                gsap.from([navRef.current, copyrightRef.current, nav2Ref.current], {
                    scrollTrigger: { trigger: dividerRef.current, start: 'top 90%' },
                    y: 24,
                    opacity: 0,
                    duration: 0.8,
                    ease: 'power3.out',
                    stagger: 0.1,
                });

                gsap.from(arrowRef.current, {
                    scrollTrigger: { trigger: footerRef.current, start: 'top 75%' },
                    scale: 0.3,
                    opacity: 0,
                    rotation: -120,
                    duration: 1.1,
                    ease: 'back.out(1.6)',
                    delay: 0.35,
                });

                const arrowPath = arrowRef.current?.querySelector('path') as SVGPathElement | null;
                if (arrowPath) {
                    const length = arrowPath.getTotalLength?.() ?? 60;
                    gsap.set(arrowPath, { strokeDasharray: length, strokeDashoffset: length });
                    gsap.to(arrowPath, {
                        scrollTrigger: { trigger: footerRef.current, start: 'top 75%' },
                        strokeDashoffset: 0,
                        duration: 0.9,
                        ease: 'power2.inOut',
                        delay: 0.7,
                    });
                }

                // Desktop only: scroll-scrubbed parallax on the card.
                // Mobile gets a plain settle-in instead — scrub tied to a
                // resizing/auto-height container is unreliable and costs
                // more on lower-powered devices for a barely-visible effect.
                if (isDesktop) {
                    gsap.to(`.${styles.container}`, {
                        scrollTrigger: {
                            trigger: footerRef.current,
                            start: 'top bottom',
                            end: 'bottom top',
                            scrub: 1.5,
                        },
                        yPercent: -5,
                        ease: 'none',
                    });
                } else {
                    gsap.from(`.${styles.container}`, {
                        scrollTrigger: { trigger: footerRef.current, start: 'top 85%' },
                        y: 16,
                        opacity: 0,
                        duration: 0.7,
                        ease: 'power2.out',
                    });
                }

                return () => split.revert();
            }
        );

        return () => mm.revert();

    }, { scope: footerRef });

    return (
        <footer ref={footerRef} className={styles.footer}>
            <div className={styles.container}>

                <div className={styles.top}>
                    <h2 ref={headingRef} className={styles.heading}>
                        Get{' '}
                        <span className={styles.letterI}>
                            ı<span ref={dotRef} className={styles.dot} />
                        </span>
                        n touch
                    </h2>

                    <div ref={buttonRef} className={styles.buttons}>
                        <RoundedButton>
                            <Link href="mailto:sauurow@gmail.com">sauurow@gmail.com</Link>
                        </RoundedButton>
                    </div>
                </div>

                <button
                    ref={arrowRef}
                    type="button"
                    onClick={scrollToTop}
                    className={styles.arrow}
                    aria-label="Back to top"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 24 24" strokeWidth="1.2" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round"
                            d="m19.5 4.5-15 15m0 0h11.25m-11.25 0V8.25" />
                    </svg>
                </button>

                <div ref={dividerRef} className={styles.divider} />

                <div className={styles.bottom}>

                    <div ref={navRef} className={styles.nav}>
                        <span className={styles.sectionLabel}>Navigation</span>
                        <ul>
                            {[
                                { label: 'Home', href: '/' },
                                { label: 'About', href: '/about' },
                                { label: 'Projects', href: '/project' },
                                { label: 'Contact', href: '/contact' },
                            ].map(({ label, href }) => (
                                <Magnetic key={label}>
                                    <li><Link href={href}>{label}</Link></li>
                                </Magnetic>
                            ))}
                        </ul>
                    </div>

                    <div ref={copyrightRef} className={styles.copyright}>
                        <p>© {new Date().getFullYear()} Saurow.<br />All rights reserved.</p>
                    </div>

                    <div ref={nav2Ref} className={styles.nav2}>
                        <span className={styles.sectionLabel}>Socials</span>
                        <ul>
                            {[
                                { label: 'X', href: 'https://x.com/sauroww' },
                                { label: 'Github', href: 'https://github.com/Saur0w' },
                                { label: 'LinkedIn', href: 'https://www.linkedin.com/in/saurabh-thapliyal-76a0a6306/' },
                                { label: 'Dribbble', href: 'https://dribbble.com/sthapliyal085' },
                                { label: 'Behance', href: 'https://www.behance.net/saurabhthapliy2' }

                            ].map(({ label, href }) => (
                                <Magnetic key={label}>
                                    <li>
                                        <a href={href} target="_blank" rel="noopener noreferrer">
                                            {label}
                                        </a>
                                    </li>
                                </Magnetic>
                            ))}
                        </ul>
                    </div>

                </div>
            </div>
        </footer>
    );
}