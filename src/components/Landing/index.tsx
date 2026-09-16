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
    const footerRef = useRef<HTMLDivElement>(null);
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

        const headerInners = headerRef.current?.querySelectorAll(`.${styles.maskInner}`);
        if (headerInners && headerRef.current) {
            gsap.set(headerRef.current, { opacity: 1 });
            gsap.fromTo(
                headerInners,
                {
                    yPercent: 120,
                },
                {
                    yPercent: 0,
                    duration: 1.1,
                    stagger: 0.04,
                    ease: 'power4.out',
                    delay: 2.8,
                }
            );
        }

        const footerInners = footerRef.current?.querySelectorAll(`.${styles.maskInner}`);
        if (footerInners && footerRef.current) {
            gsap.set(footerRef.current, { opacity: 1 });
            gsap.fromTo(
                footerInners,
                {
                    yPercent: 120,
                },
                {
                    yPercent: 0,
                    duration: 1.1,
                    stagger: 0.04,
                    ease: 'power4.out',
                    delay: 2.9,
                }
            );
        }
    }, []);

    return (
        <section className={styles.landing}>
            <header ref={headerRef} style={{ opacity: 0 }}>
                <div className={styles.colBrand}>
                    <div className={styles.mask}>
                        <Link href="/" className={`${styles.brandTitle} ${styles.maskInner}`}>
                            SAUROW
                        </Link>
                    </div>
                </div>

                <div className={styles.col}>
                    <div className={styles.mask}>
                        <p className={`${styles.metaLabel} ${styles.maskInner}`}>AVAILABLE TO DO FREELANCE</p>
                    </div>
                    <div className={styles.mask}>
                        <Link href="mailto:sauurow@gmail.com" className={`${styles.metaLink} ${styles.maskInner}`}>
                            SAUUROW@GMAIL.COM
                        </Link>
                    </div>
                </div>

                <div className={styles.col}>
                    <div className={styles.mask}>
                        <p className={`${styles.metaLabel} ${styles.maskInner}`}>Frontend Dev.</p>
                    </div>
                    <div className={styles.mask}>
                        <p className={`${styles.metaLabel} ${styles.maskInner}`}>WEB DESIGN UI UX</p>
                    </div>
                </div>

                <div className={styles.colSocial}>
                    <div className={styles.mask}>
                        <p className={`${styles.metaLabel} ${styles.maskInner}`}>SOCIAL</p>
                    </div>
                    <ul>
                        <Magnetic>
                            <li className={styles.maskInline}>
                                <Link href="https://x.com/sauroww" className={styles.maskInner}>X</Link>
                            </li>
                        </Magnetic>
                        <Magnetic>
                            <li className={styles.maskInline}>
                                <Link href="https://www.linkedin.com/in/saurabh-thapliyal-76a0a6306/" className={styles.maskInner}>Li</Link>
                            </li>
                        </Magnetic>
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

            <footer ref={footerRef} style={{ opacity: 0 }}>
                <div className={styles.footerLeft}>
                    <div className={styles.mask}>
                        <p className={styles.maskInner}>© DESIGN</p>
                    </div>
                    <div className={styles.mask}>
                        <p className={styles.maskInner}>SAUROW</p>
                    </div>
                </div>
                <div className={styles.footerRight}>
                    <div className={styles.mask}>
                        <p className={styles.maskInner}>DEV. SAUROW</p>
                    </div>
                </div>
            </footer>
        </section>
    );
}