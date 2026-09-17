'use client';

import styles from './style.module.scss';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useRef } from 'react';

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
    const paraRef = useRef<HTMLDivElement>(null);
    const footerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const imgs = containerRef.current?.querySelectorAll('img');
        if (!imgs) return;

        const tl2 = gsap.timeline();
        tl2.to(lineRef.current, {
            width: '75vw',
            duration: 2.5,
            ease: 'expo.inOut',
        });

        gsap.from(paraRef.current, {
            delay: 2.2,
            x: 300,
            duration: 1.5,
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

        tl.set(footerRef.current, {
            opacity: 1,
            delay: 1,
        });
    }, []);

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

            <div className={styles.heading} ref={paraRef}>
                <h1>
                    AS<span className={styles.dot}>●</span>01<br />/04
                </h1>
            </div>

            <div className={styles.footer} ref={footerRef}>
                <h4>
                    &copy; DESIGN <br />SAUROW
                </h4>
                <h4>
                    C-NR. 07186749<br />DEV. SAUROW
                </h4>
            </div>
        </section>
    );
}