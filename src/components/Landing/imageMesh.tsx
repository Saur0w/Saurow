"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { imageVertex, imageFragment } from "@/lib/shaders";

export default function ImageMesh() {
    const matRef       = useRef<THREE.ShaderMaterial>(null!);
    const { viewport } = useThree();
    const hoverTarget  = useRef(0);
    const hoverCurrent = useRef(0);

    const texture = useTexture("/images/road.jpg");
    texture.minFilter = THREE.LinearFilter;

    const pw = viewport.width;
    const ph = viewport.height;

    const aspect = pw / ph;

    const uniforms = useMemo(() => ({
        uTexture : { value: texture                      },
        uMouse   : { value: new THREE.Vector2(0.5, 0.5) },
        uHover   : { value: 0                            },
        uTime    : { value: 0                            },
        uAspect  : { value: aspect                       },
    }), [texture, aspect]);

    useFrame(({ clock }) => {
        if (!matRef.current) return;
        hoverCurrent.current += (hoverTarget.current - hoverCurrent.current) * 0.06;
        matRef.current.uniforms.uHover.value  = hoverCurrent.current;
        matRef.current.uniforms.uTime.value   = clock.getElapsedTime();
    });

    return (
        <mesh
            onPointerMove={(e) => {
                if (!matRef.current || !e.uv) return;
                matRef.current.uniforms.uMouse.value.set(e.uv.x, e.uv.y);
            }}
            onPointerEnter={() => { hoverTarget.current = 1; }}
            onPointerLeave={() => { hoverTarget.current = 0; }}
        >
            <planeGeometry args={[pw, ph, 1, 1]} />
            <shaderMaterial
                ref={matRef}
                vertexShader={imageVertex}
                fragmentShader={imageFragment}
                uniforms={uniforms}
                transparent={false}
                depthWrite={false}
            />
        </mesh>
    );
}