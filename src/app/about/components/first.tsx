"use client";

import { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import styles from './first.module.scss';

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

export default function About() {
    const sectionRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const textRef = useRef<HTMLParagraphElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    const imageWrapperRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const titleSplit = SplitText.create(headingRef.current!, { type: "chars", charsClass: styles.char });
        const textSplit = SplitText.create(textRef.current!, { type: "lines", linesClass: styles.lineInner });

        textSplit.lines.forEach(line => {
            const wrapper = document.createElement('div');
            wrapper.className = styles.lineMask;
            line.parentNode?.insertBefore(wrapper, line);
            wrapper.appendChild(line);
        });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 75%",
                toggleActions: "play none none none"
            }
        });

        tl.from(titleSplit.chars, {
            yPercent: 100,
            autoAlpha: 0,
            duration: 0.8,
            ease: "power4.out",
            stagger: 0.02
        })
            .from(textSplit.lines, {
                yPercent: 100,
                duration: 1,
                ease: "power4.out",
                stagger: 0.04
            }, "-=0.5");

        gsap.fromTo(imageWrapperRef.current,
            { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" },
            {
                clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)",
                duration: 1.4,
                ease: "power4.inOut",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 70%"
                }
            }
        );

        gsap.fromTo(imageRef.current,
            { yPercent: -15, scale: 1.15 },
            {
                yPercent: 15,
                scale: 1,
                ease: "none",
                scrollTrigger: {
                    trigger: imageWrapperRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true
                }
            }
        );

        return () => {
            titleSplit.revert();
            textSplit.revert();
        };
    }, { scope: sectionRef });

    return (
        <section className={styles.about} ref={sectionRef}>
            <div className={styles.left}>
                <div className={styles.headingMask}>
                    <h1 ref={headingRef}>ABOUT</h1>
                </div>
                <p ref={textRef}>
                    I’m a 22-year-old creative front-end/motion developer & designer from India with a passion for bringing designs to life
                    through pixel-perfect precision and smooth animations. With a strong foundation in modern web technologies
                    and a keen eye for visual storytelling, I specialize in crafting seamless micro-interactions and engaging user experiences.
                    My work reflects a blend of creativity and technical expertise, focused on transforming ideas into interactive digital realities.
                </p>
            </div>

            <div className={styles.right}>
                <div className={styles.imageWrapper} ref={imageWrapperRef}>
                    <Image
                        ref={imageRef}
                        src="/images/about.jpg"
                        alt="profile"
                        fill
                        priority
                        unoptimized
                    />
                </div>
            </div>
        </section>
    );
}