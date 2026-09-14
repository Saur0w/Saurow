'use client';

import React, { useRef, useMemo } from 'react';
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

// Register MeshBasicNodeMaterial for R3F JSX
extend({ MeshBasicNodeMaterial });

declare module '@react-three/fiber' {
    interface ThreeElements {
        meshBasicNodeMaterial: ThreeElement<typeof MeshBasicNodeMaterial>;
    }
}

export default function MeshComponent() {
    const { viewport, size } = useThree();
    const texture = useTexture('/images/a.png');
    const meshRef = useRef<THREE.Mesh>(null!);
    const matRef = useRef<MeshBasicNodeMaterial>(null!);

    // Match sizing to the 200px x 220px image container
    const w = viewport.width * (200 / (size.width || 1));
    const h = viewport.height * (220 / (size.height || 1));

    // Build the color node once texture is loaded
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

        const tl = gsap.timeline({ delay: 0.8 });

        tl.to(meshRef.current.scale, {
            x: 0.85,
            y: 0.85,
            duration: 1.0,
            ease: 'power2.out',
        })
            .to(
                uBend,
                {
                    value: Math.PI,
                    duration: 3.2,
                    ease: 'power2.inOut',
                },
                'flip'
            )
            .to(
                meshRef.current.scale,
                {
                    x: 2.5,
                    y: 2.5,
                    duration: 3.2,
                    ease: 'power2.inOut',
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