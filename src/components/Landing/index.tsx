"use client";

import Link from 'next/link';
import styles from './style.module.scss';
import { useRef } from 'react';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';
import Rounded from '@/ui/Rounded/index';
import Image from 'next/image';

gsap.registerPlugin(SplitText, useGSAP);

export default function Landing() {
    const landingRef = useRef<HTMLDivElement>(null);
    const inTouchRef = useRef<HTMLDivElement>(null);
    const pageRef = useRef<HTMLElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    const bikeRef = useRef<HTMLImageElement>(null);
    const speedRef = useRef<HTMLImageElement>(null);

    useGSAP(() => {
        if (!landingRef.current || !inTouchRef.current) return;

        const timeline = gsap.timeline();
        const splitInstance = new SplitText(landingRef.current, {
            type: 'lines',
            lineClass: 'split-child'
        });

        new SplitText(landingRef.current, {
            type: 'lines',
            linesClass: 'split-parent'
        });

        timeline.from(splitInstance.lines, {
            delay: 0.3,
            duration: 1.5,
            yPercent: 100,
            ease: 'power4.out',
            stagger: 0.08
        });

        timeline.from(inTouchRef.current, {
            duration: 1.2,
            opacity: 0,
            y: 50,
            ease: 'power4.out'
        }, '-=1.0');

        gsap.from(imageRef.current, {
            delay: 0.5,
            opacity: 0,
            duration: 1.2,
            y: "-50px",
            ease: 'power4.out',
        });

        gsap.from(bikeRef.current, {
            delay: 0.5,
            opacity: 0,
            duration: 1.2,
            y: "-50px",
            ease: 'power4.out',
        });

        gsap.from(speedRef.current, {
            delay: 0.5,
            opacity: 0,
            duration: 1.2,
            x: "50px",
            ease: 'power4.out',
        });

    }, {
        scope: pageRef
    });

    return (
        <section className={styles.landing} ref={pageRef}>
            <div className={styles.text}>
                <div ref={landingRef} className={styles.textContainer}>
                    <p>I&#39;m a 22-year-old creative developer from India who builds<br /> web experiences that blur the line between art and technology.<br />
                        My focus is on crafting seamless interactions and bringing digital ideas to life with precision.</p>
                </div>
                <div
                    className={styles.getInTouchContainer}
                    ref={inTouchRef}
                >
                    <Link href="/work">
                        <Rounded>
                            <p>See my work</p>
                        </Rounded>
                    </Link>
                </div>
            </div>

            <div className={styles.second}>
                <div className={styles.imageContainer}>
                    <Image
                        src="/images/lines.jpg" alt="profile"
                        width={700} height={700}
                        className={styles.abstract}
                        quality={90}
                        priority
                        ref={imageRef}
                    />
                    <div className={styles.imageContainerRight}>
                        <Image src="/images/street.jpg" alt="profile" width={700} height={700} ref={bikeRef} />
                        <Image src="/images/speed.jpg" alt="profile" width={700} height={700} ref={speedRef} />
                    </div>
                </div>

                <div className={styles.imageText}>
                    <h1>Bringing ideas to life through meticulous<br/> front-end craftsmanship and animation.</h1>
                </div>
            </div>
        </section>
    );
}
