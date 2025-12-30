"use client";

import Link from 'next/link';
import styles from './style.module.scss';
import { useRef } from 'react';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';
import Rounded from '@/ui/Rounded/index';
import Image from 'next/image';

// Ensure plugins are registered
if (typeof window !== 'undefined') {
    gsap.registerPlugin(SplitText, useGSAP);
}

export default function Landing() {
    const containerRef = useRef<HTMLElement>(null);
    const landingRef = useRef<HTMLDivElement>(null);
    const inTouchRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    const bikeRef = useRef<HTMLImageElement>(null);
    const speedRef = useRef<HTMLImageElement>(null);

    useGSAP(
        () => {
            if (!landingRef.current || !inTouchRef.current) return;

            // 1. Create SplitText instances
            const splitParent = new SplitText(landingRef.current, {
                type: 'lines',
                linesClass: 'split-parent',
            });

            const splitChild = new SplitText(landingRef.current, {
                type: 'lines',
                linesClass: 'split-child',
            });

            // 2. Define Animations
            const timeline = gsap.timeline();

            timeline.from(splitChild.lines, {
                delay: 0.3,
                duration: 1.5,
                yPercent: 100,
                ease: 'power4.out',
                stagger: 0.08,
            });

            timeline.from(
                inTouchRef.current,
                {
                    duration: 1.2,
                    opacity: 0,
                    y: 50,
                    ease: 'power4.out',
                },
                '-=1.0'
            );

            gsap.from(imageRef.current, {
                delay: 0.5,
                opacity: 0,
                duration: 1.2,
                y: -50,
                ease: 'power4.out',
            });

            gsap.from([bikeRef.current, speedRef.current], {
                delay: 0.6,
                opacity: 0,
                duration: 1.2,
                y: 50,
                stagger: 0.1,
                ease: 'power4.out',
            });

            // 3. Handle Resize (Crucial for Responsiveness)
            // When window resizes, revert text to normal <p> tags so they wrap correctly
            const handleResize = () => {
                splitChild.revert();
                splitParent.revert();
            };

            window.addEventListener('resize', handleResize);

            return () => {
                window.removeEventListener('resize', handleResize);
                splitChild.revert();
                splitParent.revert();
            };
        },
        { scope: containerRef }
    );

    return (
        <section className={styles.landing} ref={containerRef}>
            <div className={styles.contentLeft}>
                <div ref={landingRef} className={styles.headline}>
                    <p>
                        I&#39;m a 22-year-old creative developer from India who builds web
                        experiences that blur the line between art and technology. My focus
                        is on crafting seamless interactions and bringing digital ideas to
                        life with precision.
                    </p>
                </div>
                <div className={styles.ctaContainer} ref={inTouchRef}>
                    <Link href="/work" passHref>
                        <Rounded>
                            <p>See my work</p>
                        </Rounded>
                    </Link>
                </div>
            </div>

            <div className={styles.contentRight}>
                <div className={styles.collage}>
                    <div className={styles.mainImage}>
                        <Image
                            src="/images/lines.jpg"
                            alt="Abstract lines"
                            width={700}
                            height={700}
                            quality={90}
                            priority
                            ref={imageRef}
                        />
                    </div>
                    <div className={styles.secondaryImages}>
                        <Image
                            src="/images/street.jpg"
                            alt="Street scene"
                            width={300}
                            height={300}
                            ref={bikeRef}
                        />
                        <Image
                            src="/images/speed.jpg"
                            alt="Speed abstract"
                            width={300}
                            height={300}
                            ref={speedRef}
                        />
                    </div>
                </div>

                <div className={styles.caption}>
                    <h1>
                        Bringing ideas to life through meticulous
                        <br className={styles.desktopBreak} /> front-end craftsmanship and
                        animation.
                    </h1>
                </div>
            </div>
        </section>
    );
}
