"use client";

import styles from './style.module.scss';
import { useRef } from "react";
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
    const footerRef = useRef<HTMLElement>(null);
    const dotRef = useRef<HTMLSpanElement>(null);

    useGSAP(() => {
        gsap.fromTo(dotRef.current,
            { y: -100 },
            {
                scrollTrigger: {
                    trigger: footerRef.current,
                    start: 'top 85%',
                },
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
                delay: 0.3,
            }
        );
    }, { scope: footerRef });

    return (
        <footer ref={footerRef} className={styles.footer}>
            <div className={styles.container}>
                <h1 className={styles.heading}>
                    Get <span className={styles.letterI}>
                        ı<span ref={dotRef} className={styles.dot} />
                    </span>n touch
                </h1>
            </div>
        </footer>
    );
}