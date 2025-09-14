"use client";

import styles from './style.module.scss';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { useRef } from "react";

export default function Preloader() {

    const pageRef = useRef(null);
    const textRef = useRef(null);

    useGSAP(() => {
        gsap.to(pageRef.current, {
            height: "0vh",
            duration: 1,
            ease: "power2.inOut",
        });
    });

    return (
      <div className={styles.preloader} ref={pageRef}>
        <h1 ref={textRef}>Saurow</h1>
      </div>
    );
}