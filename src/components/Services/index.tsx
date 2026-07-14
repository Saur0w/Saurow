'use client';

import React, { useRef, useState } from 'react';
import styles from './style.module.scss';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const services = [
    {
        title: "Creative Development",
        description:
            "Building immersive web experiences that blend thoughtful design with modern frontend engineering. Every interaction is crafted to feel smooth, responsive, and memorable.",
        tags: ["Next.js", "TypeScript", "GSAP", "React"]
    },
    {
        title: "Motion & Interaction",
        description:
            "Designing animations that feel purposeful, not distracting. From refined micro-interactions to scroll-driven storytelling and seamless page transitions.",
        tags: ["GSAP", "Lenis", "Framer Motion", "ScrollTrigger", "Shaders"]
    },
    {
        title: "3D & WebGL",
        description:
            "Creating interactive 3D scenes and custom shader effects that elevate digital experiences while keeping performance at the forefront.",
        tags: ["Three.js", "React Three Fiber", "GLSL", "WebGL"]
    },
    {
        title: "Performance & Optimization",
        description:
            "Delivering fast, accessible, and production-ready websites with clean architecture, optimized assets, and excellent Core Web Vitals.",
        tags: ["Next.js", "SEO", "Web Vitals", "Accessibility"]
    }
];

export default function Services() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const listRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const descriptionRefs = useRef<(HTMLDivElement | null)[]>([]);

    const toggleAccordion = (index: number) => {
        setActiveIndex(prevIndex => (prevIndex === index ? null : index));
    };

    useGSAP(() => {
        descriptionRefs.current.forEach((el, i) => {
            if (!el) return;
            if (i === activeIndex) {
                gsap.to(el, {
                    height: "auto",
                    opacity: 1,
                    duration: 0.5,
                    ease: "power3.out",
                    overwrite: "auto"
                });
            } else {
                gsap.to(el, {
                    height: 0,
                    opacity: 0,
                    duration: 0.35,
                    ease: "power3.out",
                    overwrite: "auto"
                });
            }
        });
    }, { dependencies: [activeIndex], scope: sectionRef });
    
    useGSAP(() => {
        if (!sectionRef.current) return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            }
        });

        tl.from(titleRef.current, {
            y: 40,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out"
        })
            .from(listRef.current?.children || [], {
                y: 30,
                opacity: 0,
                stagger: 0.1,
                duration: 0.6,
                ease: "power3.out"
            }, "-=0.4");

    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} className={styles.servicesSection}>
            <div className={styles.container}>
                <div className={styles.leftCol}>
                    <span className={styles.eyebrow}>Capabilities</span>
                    <h2 ref={titleRef}>
                        I can help<br />
                        you with...
                    </h2>
                </div>

                <div ref={listRef} className={styles.rightCol}>
                    {services.map((service, index) => {
                        const isOpen = activeIndex === index;
                        return (
                            <div
                                key={index}
                                className={`${styles.serviceItem} ${isOpen ? styles.active : ''}`}
                                onClick={() => toggleAccordion(index)}
                                role="button"
                                aria-expanded={isOpen}
                                tabIndex={0}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        e.preventDefault();
                                        toggleAccordion(index);
                                    }
                                }}
                            >
                                <div className={styles.header}>
                                    <div className={styles.leftHeader}>
                                        <span className={styles.index}>0{index + 1}</span>
                                        <h3>{service.title}</h3>
                                    </div>
                                    <div className={styles.iconWrapper}>
                                        <span className={styles.icon}></span>
                                    </div>
                                </div>

                                <div
                                    ref={el => { descriptionRefs.current[index] = el; }}
                                    className={styles.descriptionContainer}
                                    style={{ height: 0, opacity: 0 }}
                                >
                                    <div className={styles.descriptionContent}>
                                        <p>{service.description}</p>
                                        <div className={styles.tags}>
                                            {service.tags.map((tag, tIndex) => (
                                                <span key={tIndex} className={styles.tag}>
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}