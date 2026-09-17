'use client';

import React, { useRef, useMemo, useEffect } from 'react';
import * as THREE from 'three';
import { extend, useThree, ThreeEvent, ThreeElement } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import { MeshBasicNodeMaterial } from 'three/webgpu';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import {
    flipVertexNode,
    createTextureNode,
    uBend,
    uHover,
    uMouse,
} from '@/lib/Shaders';

extend({ MeshBasicNodeMaterial });

declare module '@react-three/fiber' {
    interface ThreeElements {
        meshBasicNodeMaterial: ThreeElement<typeof MeshBasicNodeMaterial>;
    }
}

function getCardDimensions(width: number) {
    if (width <= 480) return { w: 130, h: 143 };
    if (width <= 768) return { w: 150, h: 165 };
    if (width <= 1024) return { w: 175, h: 192 };
    return { w: 200, h: 220 };
}

function getTargetScale(width: number) {
    if (width <= 480) return 2.1;
    if (width <= 768) return 2.2;
    if (width <= 1024) return 2.3;
    return 2.5;
}

export default function MeshComponent() {
    const { viewport, size } = useThree();
    const texture = useTexture('/images/a.png');
    const meshRef = useRef<THREE.Mesh>(null!);
    const matRef = useRef<MeshBasicNodeMaterial>(null!);
    const card = useMemo(() => getCardDimensions(size.width), [size.width]);
    const w = viewport.width * (card.w / (size.width || 1));
    const h = viewport.height * (card.h / (size.height || 1));

    useEffect(() => {
        if (texture) {
            texture.colorSpace = THREE.SRGBColorSpace;
        }
    }, [texture]);

    const colorNode = useMemo(() => createTextureNode(texture), [texture]);

    const handlePointerMove = (e: ThreeEvent<PointerEvent>) => {
        if (!meshRef.current) return;
        if (e.uv) {
            uMouse.value.set(e.uv.x, e.uv.y);
        }
    };

    const handlePointerEnter = () => {
        document.body.style.cursor = 'pointer';
        gsap.to(uHover, {
            value: 1,
            duration: 0.4,
            ease: 'power2.out',
        });
    };

    const handlePointerLeave = () => {
        document.body.style.cursor = 'default';
        gsap.to(uHover, {
            value: 0,
            duration: 0.6,
            ease: 'power2.out',
        });
    };

    useGSAP(() => {
        if (!meshRef.current) return;

        const targetScale = getTargetScale(size.width);
        const tl = gsap.timeline({ delay: 0.5 });

        tl.to(meshRef.current.scale, {
            x: 0.85,
            y: 0.85,
            duration: 0.8,
            ease: 'power2.out',
        })
            .to(
                uBend,
                {
                    value: Math.PI,
                    duration: 2.2,
                    ease: 'power3.inOut',
                },
                'flip'
            )
            .to(
                meshRef.current.scale,
                {
                    x: targetScale,
                    y: targetScale,
                    duration: 2.2,
                    ease: 'power3.inOut',
                },
                'flip'
            );
    }, { scope: meshRef });

    return (
        <mesh
            ref={meshRef}
            scale={[1, 1, 1]}
            onPointerMove={handlePointerMove}
            onPointerEnter={handlePointerEnter}
            onPointerLeave={handlePointerLeave}
        >
            <planeGeometry args={[w, h, 128, 128]} />
            <meshBasicNodeMaterial
                ref={matRef}
                side={THREE.DoubleSide}
                transparent
                positionNode={flipVertexNode}
                colorNode={colorNode}
            />
        </mesh>
    );
}