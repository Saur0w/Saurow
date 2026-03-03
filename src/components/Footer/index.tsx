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
    const footerRef    = useRef<HTMLElement>(null);
    const dotRef       = useRef<HTMLSpanElement>(null);
    const headingRef   = useRef<HTMLHeadingElement>(null);
    const eyebrowRef   = useRef<HTMLSpanElement>(null);
    const buttonRef    = useRef<HTMLDivElement>(null);
    const dividerRef   = useRef<HTMLDivElement>(null);
    const navRef       = useRef<HTMLDivElement>(null);
    const copyrightRef = useRef<HTMLDivElement>(null);
    const nav2Ref      = useRef<HTMLDivElement>(null);
    const arrowRef     = useRef<HTMLDivElement>(null);

    useGSAP(() => {

        // ── 1. Heading chars split reveal ──────────────────────────────
        const split = new SplitText(headingRef.current, { type: 'chars' });

        gsap.from(split.chars, {
            scrollTrigger: { trigger: footerRef.current, start: 'top 80%' },
            yPercent: 120,
            opacity: 0,
            duration: 0.85,
            ease: 'expo.out',
            stagger: 0.03,
        });

        // ── 2. Eyebrow fade in ──────────────────────────────────────────
        gsap.from(eyebrowRef.current, {
            scrollTrigger: { trigger: footerRef.current, start: 'top 80%' },
            y: 10,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out',
        });

        // ── 3. Dot — falls and bounces onto the "i" ─────────────────────
        gsap.fromTo(dotRef.current,
            { y: -100 },
            {
                scrollTrigger: { trigger: footerRef.current, start: 'top 80%' },
                keyframes: {
                    "0%":   { y: -100, scaleY: 1,    scaleX: 1    },
                    "45%":  { y: 0,    scaleY: 0.5,  scaleX: 1.6  },
                    "58%":  { y: -30,  scaleY: 1.1,  scaleX: 0.9  },
                    "70%":  { y: 0,    scaleY: 0.75, scaleX: 1.25 },
                    "80%":  { y: -12,  scaleY: 1.05, scaleX: 0.95 },
                    "90%":  { y: 0,    scaleY: 0.9,  scaleX: 1.1  },
                    "95%":  { y: -4,   scaleY: 1,    scaleX: 1    },
                    "100%": { y: 0,    scaleY: 1,    scaleX: 1    },
                },
                duration: 1.6,
                ease: 'power2.in',
                transformOrigin: 'center bottom',
                delay: 0.4,
            }
        );

        // ── 4. Email button slide up ────────────────────────────────────
        gsap.from(buttonRef.current, {
            scrollTrigger: { trigger: footerRef.current, start: 'top 75%' },
            y: 30,
            opacity: 0,
            duration: 0.9,
            ease: 'expo.out',
            delay: 0.25,
        });

        // ── 5. Divider line draw ────────────────────────────────────────
        gsap.from(dividerRef.current, {
            scrollTrigger: { trigger: dividerRef.current, start: 'top 92%' },
            scaleX: 0,
            transformOrigin: 'left center',
            duration: 1.2,
            ease: 'expo.inOut',
        });

        // ── 6. Bottom row stagger ───────────────────────────────────────
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

        return () => split.revert();

    }, { scope: footerRef });

    return (
        <footer ref={footerRef} className={styles.footer}>
            <div className={styles.container}>


                <div className={styles.top}>
                    <h1 ref={headingRef} className={styles.heading}>
                        Get{' '}
                        <span className={styles.letterI}>
                            ı<span ref={dotRef} className={styles.dot} />
                        </span>
                        n touch
                    </h1>

                    <div ref={buttonRef} className={styles.buttons}>
                        <RoundedButton>
                            <Link href="mailto:sauurow@gmail.com">sauurow@gmail.com</Link>
                        </RoundedButton>
                    </div>
                </div>

                <div ref={arrowRef} className={styles.arrow}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                         viewBox="0 0 24 24" strokeWidth="1.2" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="m19.5 4.5-15 15m0 0h11.25m-11.25 0V8.25" />
                    </svg>
                </div>
                <div ref={dividerRef} className={styles.divider} />

                <div className={styles.bottom}>

                    <div ref={navRef} className={styles.nav}>
                        <span className={styles.sectionLabel}>Navigation</span>
                        <ul>
                            {[
                                { label: 'Home',     href: '/' },
                                { label: 'About',    href: '/about' },
                                { label: 'Projects', href: '/project' },
                                { label: 'Contact',  href: '/contact' },
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
                                { label: 'Github',      href: 'https://github.com/Saur0w' },
                                { label: 'LinkedIn',    href: 'https://www.linkedin.com/in/saurabh-thapliyal-76a0a6306/' },
                                { label: 'Dribbble',    href: 'https://dribbble.com/sthapliyal085' },
                                { label: 'Behance',     href: 'https://www.behance.net/saurabhthapliy2' }

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