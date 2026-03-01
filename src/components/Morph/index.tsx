'use client';

import styles from './style.module.scss';
import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const shapes: string[] = [
    "M150 60 C190 100 220 130 220 170 C220 210 190 240 150 240 C110 240 80 210 80 170 C80 130 110 100 150 60 Z",
    "M90 170 A30 30 0 1 1 150 170 A30 30 0 1 1 90 170 Z M135 150 A30 30 0 1 1 195 150 A30 30 0 1 1 135 150 Z M180 130 A30 30 0 1 1 240 130 A30 30 0 1 1 180 130 Z",
    "M70 100 H230 V120 H70 Z M70 140 H230 V160 H70 Z M70 180 H230 V200 H70 Z",
    "M170 60 L110 160 H150 L130 240 L210 130 H170 Z",
    "M130 70 H170 V130 H230 V170 H170 V230 H130 V170 H70 V130 H130 Z"
];


const para: string[] = [
    "Design",
    "Motion",
    "UI",
    "Performance",
    "And More"
];

export default function Home() {
    const [index, setIndex] = useState<number>(0);
    const nbOfCircles = 30;
    const radius = 20;
    const circles = useRef<(SVGCircleElement | null)[]>([]);
    const paths = useRef<(SVGPathElement | null)[]>([]);

    useGSAP(() => {
        const currentPath = paths.current[index];
        if (!currentPath) return;

        const length = currentPath.getTotalLength();
        const step = length / nbOfCircles;

        circles.current.forEach((circle, i) => {
            if (!circle) return;
            const { x, y } = currentPath.getPointAtLength(i * step);

            gsap.to(circle, {
                attr: { cx: x, cy: y },
                delay: i * 0.025,
                duration: 0.4,
                ease: "power2.out",
            });
        });
    }, { dependencies: [index] });

    return (
        <div className={styles.container}>
            <div className={styles.heading}>
                <h1>I can help you with ...</h1>
            </div>

            <div className={styles.body}>
                <div className={styles.numbers}>
                    {para.map((text, i) => (
                        <p
                            key={`para_${i}`}
                            style={{ color: i === index ? "#a3dd07" : "black", cursor: "pointer" }}
                            onMouseOver={() => setIndex(i)}
                        >
                            {text}
                        </p>
                    ))}
                </div>

                <svg viewBox="0 0 256 256">
                    <defs>
                        <filter id="filter">
                            <feGaussianBlur in="SourceAlpha" stdDeviation="20" result="blur" />
                            <feColorMatrix
                                in="blur"
                                mode="matrix"
                                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 25 -15"
                                result="filter"
                            />
                        </filter>
                    </defs>

                    <g>
                        {shapes.map((path, i) => (
                            <path
                                key={`p_${i}`}
                                ref={(el) => { paths.current[i] = el; }}
                                d={path}
                                fill="none"
                                stroke="transparent"
                            />
                        ))}
                    </g>

                    <g>
                        {[...Array(nbOfCircles)].map((_, i) => (
                            <circle
                                key={`c_${i}`}
                                ref={(el) => { circles.current[i] = el; }}
                                cx="128"
                                cy="128"
                                r={radius}
                            />
                        ))}
                    </g>
                </svg>
            </div>
        </div>
    );
}