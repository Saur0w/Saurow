'use client';

import styles from './style.module.scss';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useRef } from 'react';
import dynamic from 'next/dynamic';
import Link from "next/link";
const Scene = dynamic(() => import('./scene'), { ssr: false });
import Magnetic from "@/ui/Magnetic"

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
    const headerRef = useRef<HTMLElement>(null);

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

        gsap.from(roleRef.current, {
            yPercent: 100,
            opacity: 0,
            duration: 1,
            ease: 'expo.out',
            delay: 3.4,
        });

        tl.set(footerRef.current, {
            opacity: 1,
            delay: 1,
        });

        gsap.from(scrollRef.current, {
            opacity: 0,
            y: 20,
            duration: 0.8,
            ease: 'power2.out',
            delay: 4,
        });

        gsap.to(scrollRef.current, {
            y: 8,
            repeat: -1,
            yoyo: true,
            duration: 1.2,
            ease: 'sine.inOut',
            delay: 4.5,
        });
    }, []);

    return (
        <section className={styles.landing}>
            <header ref={headerRef}>
                <div className={styles.colBrand}>
                    <Link href="/" className={styles.brandTitle}>SAUROW</Link>
                </div>

                <div className={styles.col}>
                    <p className={styles.metaLabel}>AVAILABLE TO DO FREELANCE</p>
                    <Link href="mailto:sauurow@gmail.com" className={styles.metaLink}>
                        SAUUROW@GMAIL.COM
                    </Link>
                </div>

                <div className={styles.col}>
                    <p className={styles.metaLabel}>Frontend Dev.</p>
                    <p className={styles.metaLabel}>WEB DESIGN UI UX</p>
                </div>

                <div className={styles.colSocial}>
                    <p className={styles.metaLabel}>SOCIAL</p>
                    <ul>
                        <Magnetic><li><Link href="https://x.com/sauroww">X</Link></li></Magnetic>
                        <Magnetic><li><Link href="https://www.linkedin.com/in/saurabh-thapliyal-76a0a6306/">Li</Link></li></Magnetic>

                    </ul>
                </div>
            </header>
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

            <footer ref={footerRef}>
                <div className={styles.footerLeft}>
                    <p>© DESIGN</p>
                    <p>SAUROW</p>
                </div>
                <div className={styles.footerRight}>
                    <p>DEV. SAUROW</p>
                </div>
            </footer>
        </section>
    );
}