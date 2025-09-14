"use client";

import React, { useEffect, useRef, ReactNode, HTMLAttributes } from 'react';
import styles from './style.module.scss';
import gsap from 'gsap';
import Magnetic from '@/ui/Magnetic/index';

interface RoundedButtonProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    backgroundColor?: string;
}

export default function RoundedButton({
                                          children,
                                          backgroundColor = '#151515',
                                          ...attributes
                                      }: RoundedButtonProps) {
    const circle = useRef<HTMLDivElement>(null);
    const timeline = useRef<GSAPTimeline | null>(null);
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    useEffect(() => {
        timeline.current = gsap.timeline({ paused: true });
        if (circle.current && timeline.current) {
            timeline.current
                .to(circle.current, { top: '-25%', width: '150%', duration: 0.4, ease: 'power3.in' }, 'enter')
                .to(circle.current, { top: '-150%', width: '125%', duration: 0.25 }, 'exit');
        }
    }, []);

    const manageMouseEnter = () => {
        if (timeoutId) clearTimeout(timeoutId);
        if (timeline.current) {
            timeline.current.tweenFromTo('enter', 'exit');
        }
    };

    const manageMouseLeave = () => {
        timeoutId = setTimeout(() => {
            if (timeline.current) {
                timeline.current.play();
            }
        }, 300);
    };

    return (
        <Magnetic>
            <div
                className={styles.roundedButton}
                style={{ overflow: 'hidden' }}
                onMouseEnter={manageMouseEnter}
                onMouseLeave={manageMouseLeave}
                {...attributes}
            >
                {children}
                <div ref={circle} style={{ backgroundColor }} className={styles.circle}></div>
            </div>
        </Magnetic>
    );
}
