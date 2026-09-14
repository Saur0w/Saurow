'use client';

import React, { Suspense, useEffect, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useThree } from '@react-three/fiber';
import { WebGPURenderer } from 'three/webgpu';
import MeshComponent from './mesh';

function WebGPUInitializer({ onReady }: { onReady: () => void }) {
    const gl = useThree((state) => state.gl) as unknown as WebGPURenderer;

    useEffect(() => {
        let active = true;

        if (gl && typeof gl.init === 'function') {
            gl.init()
                .then(() => {
                    if (active) onReady();
                })
                .catch((err) => {
                    console.error('WebGPU initialization failed:', err);
                });
        } else {
            onReady();
        }

        return () => {
            active = false;
        };
    }, [gl, onReady]);

    return null;
}

export default function Scene() {
    const [isReady, setIsReady] = useState(false);

    return (
        <Canvas
            flat
            frameloop={isReady ? 'always' : 'never'}
            gl={(props) => {
                const renderer = new WebGPURenderer({
                    canvas: props.canvas as HTMLCanvasElement,
                    antialias: true,
                    alpha: true,
                });
                renderer.toneMapping = THREE.NoToneMapping;
                return renderer as unknown as THREE.WebGLRenderer;
            }}
            camera={{ position: [0, 0, 5], fov: 45 }}
            style={{ width: '100%', height: '100%' }}
        >
            <WebGPUInitializer onReady={() => setIsReady(true)} />

            {isReady && (
                <Suspense fallback={null}>
                    <MeshComponent />
                </Suspense>
            )}
        </Canvas>
    );
}