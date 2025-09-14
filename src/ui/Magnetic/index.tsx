"use client";

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface MagneticProps {
    children: React.ReactElement;
}

export default function MagneticWrapper({ children }: MagneticProps) {
    const magnetic = useRef<HTMLElement>(null);

    useGSAP(() => {
        if (!magnetic.current) return;

        const element = magnetic.current;

        const xTo = gsap.quickTo(element, 'x', {
            duration: 1,
            ease: 'elastic.out(1, 0.3)'
        });
        const yTo = gsap.quickTo(element, 'y', {
            duration: 1,
            ease: 'elastic.out(1, 0.3)'
        });

        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const { height, width, left, top } = element.getBoundingClientRect();
            const x = clientX - (left + width / 2);
            const y = clientY - (top + height / 2);
            xTo(x * 0.35);
            yTo(y * 0.35);
        };

        const handleMouseLeave = () => {
            xTo(0);
            yTo(0);
        };

        element.addEventListener('mousemove', handleMouseMove);
        element.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            element.removeEventListener('mousemove', handleMouseMove);
            element.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, { scope: magnetic });

    if (!React.isValidElement(children)) {
        return children;
    }

    return React.cloneElement(children as React.ReactElement<any>, {
        ref: magnetic
    });
}
