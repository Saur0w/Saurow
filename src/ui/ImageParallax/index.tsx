"use client";

import { useLenis } from "lenis/react";
import React, { useEffect, useRef } from "react";
import Image from "next/image";

const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;

export default function Parallax({ src, alt }: { src: string, alt: string}) {
    const imageRef = useRef<HTMLImageElement>(null);
    const boundsRef = useRef({ top: 0, bottom: 0 });
    const currentTranslateY = useRef(0);
    const targetTranslateY = useRef(0);

    const rafId = useRef<number | null>(null);

    useEffect(() => {
        const updateBounds = () => {
            if (imageRef.current) {
                const rect = imageRef.current.getBoundingClientRect();
                boundsRef.current = {
                    top: rect.top + window.scrollY,
                    bottom: rect.bottom + window.scrollY
                };
            }
        };

        updateBounds();
        window.addEventListener("resize", updateBounds);

        const animate = () => {
            if (imageRef.current) {
                currentTranslateY.current = lerp(currentTranslateY.current, targetTranslateY.current, 0.1);

                if (Math.abs(currentTranslateY.current - targetTranslateY.current) > 0.01) {
                    imageRef.current.style.transform = `translateY(${currentTranslateY.current}px) scale(1.25)`;
                }
            }
            rafId.current = requestAnimationFrame(animate);
        };
        animate();

        return () =>  {
            window.removeEventListener("resize", updateBounds);
            if (rafId.current) {
                cancelAnimationFrame(rafId.current);
            }
        }
    }, []);

    useLenis(({ scroll }) => {
        if (!boundsRef.current) return;
        const relativeScroll = scroll - boundsRef.current.top;
        targetTranslateY.current = relativeScroll * 0.1;
    });

    return (

        <div style={{ overflow: "hidden", position: "relative", width: "100%", height: "100%" }}>
            <Image
                ref={imageRef}
                src={src}
                alt={alt}
                fill
                style={{
                    objectFit: "cover",
                    willChange: "transform",
                    transform: "translateY(0) scale(1.15)"
                }}
                unoptimized
            />
        </div>
    );
}