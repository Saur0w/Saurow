'use client';

import styles from './style.module.scss';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useRef } from 'react';
import dynamic from 'next/dynamic';

const Scene = dynamic(() => import('./scene'), { ssr: false });

interface ImageProps {
    src: string;
    alt: string;
}

const images: ImageProps[] = [
    { src: '/images/look.jpg', alt: 'm' },
    { src: '/images/h.jpg', alt: 'h' },
    { src: '/images/t.jpg', alt: 't' },
    { src: '/images/b.jpg', alt: 'b' },
    { src: '/images/f.jpg', alt: 'look at the sky' },
    { src: '/images/musician.jpg', alt: 'Musician' },
    { src: '/images/rosa.jpg', alt: 'rosa' },
    { src: '/images/nurture.jpg', alt: 'Nurture' },
    { src: '/images/adf.jpg', alt: 'adf' },
    { src: '/images/green.jpg', alt: 'green' },
    { src: '/images/narin.jpg', alt: 'Narin' },
];

export default function Landing() {
    const containerRef = useRef<HTMLDivElement>(null);
    const sceneRef = useRef<HTMLDivElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);
    const nameRef = useRef<HTMLDivElement>(null);
    const roleRef = useRef<HTMLDivElement>(null);
    const footerRef = useRef<HTMLDivElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const imgs = containerRef.current?.querySelectorAll('img');
        if (!imgs) return;

        const tl2 = gsap.timeline();
        tl2.to(lineRef.current, {
            width: '75vw',
            duration: 2.5,
            ease: 'expo.inOut',
        });

        tl2.to(lineRef.current, {
            width: 0,
            duration: 1.2,
            ease: 'expo.inOut',
        });

        const tl = gsap.timeline({ delay: 1 });

        imgs.forEach((img, i) => {
            tl.set(
                img,
                {
                    opacity: 0,
                },
                i * 0.15
            );
        });

        tl.set(sceneRef.current, {
            opacity: 1,
        });

        // Animate name in — staggered letter reveal
        const nameChars = nameRef.current?.querySelectorAll('.name-char');
        if (nameChars) {
            gsap.from(nameChars, {
                yPercent: 120,
                duration: 1.2,
                ease: 'expo.out',
                stagger: 0.04,
                delay: 2.8,
            });
        }

        // Animate role tagline
        gsap.from(roleRef.current, {
            yPercent: 100,
            opacity: 0,
            duration: 1,
            ease: 'expo.out',
            delay: 3.4,
        });

        // Footer reveal
        tl.set(footerRef.current, {
            opacity: 1,
            delay: 1,
        });

        // Scroll indicator
        gsap.from(scrollRef.current, {
            opacity: 0,
            y: 20,
            duration: 0.8,
            ease: 'power2.out',
            delay: 4,
        });

        // Pulse animation for scroll indicator
        gsap.to(scrollRef.current, {
            y: 8,
            repeat: -1,
            yoyo: true,
            duration: 1.2,
            ease: 'sine.inOut',
            delay: 4.5,
        });
    }, []);

    const splitName = (text: string) => {
        return text.split('').map((char, i) => (
            <span key={i} className={`name-char ${styles.nameChar}`}>
                {char === ' ' ? '\u00A0' : char}
            </span>
        ));
    };

    return (
        <section className={styles.landing}>
            <div className={styles.scene} ref={sceneRef} style={{ opacity: 0 }}>
                <Scene />
            </div>

            <div className={styles.imageContainer} ref={containerRef}>
                {images.map((image, index) => (
                    <Image
                        key={index}
                        src={image.src}
                        alt={image.alt}
                        fill
                        sizes="200px"
                        style={{
                            objectFit: 'cover',
                            zIndex: images.length - index,
                        }}
                    />
                ))}
            </div>
            <div className={styles.line} ref={lineRef} />

            {/* Name & Role */}
            <div className={styles.identity}>
                <div className={styles.nameWrapper}>
                    <h1 className={styles.name} ref={nameRef}>
                        {splitName('SAURABH')}
                    </h1>
                </div>
                <div className={styles.roleWrapper} >
                    <p className={styles.role} ref={roleRef}>Creative Developer</p>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className={styles.scrollIndicator} ref={scrollRef}>
                <span className={styles.scrollLine} />
                <span className={styles.scrollText}>SCROLL</span>
            </div>

            {/* Footer bar */}
            <div className={styles.footer} ref={footerRef}>
                <h4>
                    AVAILABLE FOR<br />FREELANCE
                </h4>
                <h4>
                    PORTFOLIO &mdash; 2026<br />SAUROW
                </h4>
            </div>
        </section>
    );
}