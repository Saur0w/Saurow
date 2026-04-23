"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { vertexShader, fragmentShader } from "@/lib/shaders";

function buildTexture(font: string): THREE.CanvasTexture {
    const W = 4096;
    const H = 1024;

    const canvas = document.createElement("canvas");
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext("2d")!;
    ctx.clearRect(0, 0, W, H);

    ctx.fillStyle = "black";
    ctx.font = `700 ${Math.floor(H * 0.80)}px ${font}`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    if ("letterSpacing" in ctx) {
        (ctx as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing = "-4px";
    }

    ctx.fillText("SAUROW", W / 2, H / 2);

    const tex = new THREE.CanvasTexture(canvas);
    tex.minFilter = THREE.LinearFilter;
    tex.magFilter = THREE.LinearFilter;
    tex.generateMipmaps = false;
    tex.needsUpdate = true;

    return tex;
}

export default function Mesh() {
    const matRef = useRef<THREE.ShaderMaterial>(null!);
    const { viewport } = useThree();

    const hover = useRef(0);
    const hoverTarget = useRef(0);

    const texture = useMemo(
        () => buildTexture("'Arial Black', 'Arial Bold', Arial, sans-serif"),
        []
    );

    const pw = viewport.width;
    const ph = viewport.height / 4;

     const uniforms = useMemo(() => ({
         uTexture: { value: texture },
         uMouse: { value: new THREE.Vector2(0.5, 0.5) },
         uHover: { value: 0 },
         uTime: { value: 0 }
     }), [texture]);

     useFrame(({ clock }) => {
         if (!matRef.current) return;

         hover.current += (hoverTarget.current - hover.current) * 0.08;

         matRef.current.uniforms.uHover.value = hover.current;
         matRef.current.uniforms.uTime.value = clock.getElapsedTime();
     });

     return (
         <mesh onPointerMove={(e) => {
             if (!matRef.current || !e.uv) return;
             matRef.current.uniforms.uMouse.value.set(e.uv.x, e.uv.y);
         }}
               onPointerEnter={() => { hoverTarget.current = 1; }}
               onPointerLeave={() => { hoverTarget.current = 0; }}
         >
             <planeGeometry args={[pw, ph, 32, 32]} />
             <shaderMaterial ref={matRef}
                             vertexShader={vertexShader}
                             fragmentShader={fragmentShader}
                             uniforms={uniforms}
                             transparent
                             depthWrite={false}
                             />
         </mesh>
     )
}