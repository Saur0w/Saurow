"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { textVertex, textFragment } from "@/lib/shaders";

function buildTextTexture(text: string, font: string): THREE.CanvasTexture {
    const W = 4096;
    const H = 1024;

    const canvas  = document.createElement("canvas");
    canvas.width  = W;
    canvas.height = H;

    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "#f7f7f7";
    ctx.fillRect(0, 0, W, H);

    const fontSize = Math.floor(H * 0.82);
    ctx.font = `700 ${fontSize}px ${font}`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const textWidth   = ctx.measureText(text).width;
    const scaleFactor = Math.min(1, W / textWidth);
    const aspectCorrection = W / H;

    ctx.setTransform(
        scaleFactor,
        0,
        0,
        scaleFactor / aspectCorrection,
        W / 2,
        H / 2,
    );

    ctx.strokeStyle = "#1a1a1a";
    ctx.lineWidth = fontSize * 0.005;
    for (let i = 0; i < 3; i++) ctx.strokeText(text, 0, 0);

    ctx.fillStyle = "#1a1a1a";
    ctx.fillText(text, 0, 0);

    const tex = new THREE.CanvasTexture(canvas);
    tex.minFilter = THREE.LinearFilter;
    tex.magFilter = THREE.LinearFilter;
    tex.generateMipmaps = false;
    tex.needsUpdate = true;
    return tex;
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function TextMesh() {
    const matRef       = useRef<THREE.ShaderMaterial>(null!);
    const { viewport } = useThree();

    // ── Mouse state (exact vanilla equivalent, stored as refs for perf) ──────
    // mousePosition       ↔ smoothed current   (lerped each frame)
    // targetMousePosition ↔ raw target          (set on pointermove)
    // prevPosition        ↔ target from the prior pointermove
    // easeFactor          ↔ 0.02 → 0.2 → 0.02  (same logic as vanilla)
    const easeFactor= useRef(0.02);
    const mousePosition= useRef(new THREE.Vector2(0.5, 0.5));
    const targetMousePosition= useRef(new THREE.Vector2(0.5, 0.5));
    const prevPosition= useRef(new THREE.Vector2(0.5, 0.5));

    // Build texture once; swap font string to your actual loaded typeface
    const texture = useMemo(
        () => buildTextTexture("SAUROW", "'Poppins', sans-serif"),
        [],
    );

    // Plane dimensions: full viewport width, height = width / 2.5 (taller plane)ok coo
    const pw = viewport.width;
    const ph = viewport.width / 1.3;

    // Uniforms match the shader exactly: u_texture, u_mouse, u_prevMouse
    const uniforms = useMemo(() => ({
        u_texture : { value: texture                        },
        u_mouse   : { value: new THREE.Vector2(0.5, 0.5)   },
        u_prevMouse: { value: new THREE.Vector2(0.5, 0.5)  },
    }), [texture]);

    // ── Per-frame lerp + uniform sync (mirrors animateScene()) ───────────────
    useFrame(() => {
        if (!matRef.current) return;

        // Lerp smoothed mouse toward target
        mousePosition.current.lerp(targetMousePosition.current, easeFactor.current);

        // Y is flipped (1 - y) to convert from R3F UV space to shader space,
        // matching the vanilla: `1.0 - mousePosition.y`
        matRef.current.uniforms.u_mouse.value.set(
            mousePosition.current.x,
            1.0 - mousePosition.current.y,
        );
        matRef.current.uniforms.u_prevMouse.value.set(
            prevPosition.current.x,
            1.0 - prevPosition.current.y,
        );
    });

    return (
        <mesh
            onPointerMove={(e) => {
                if (!e.uv) return;
                easeFactor.current = 0.2;
                prevPosition.current.copy(targetMousePosition.current);
                targetMousePosition.current.set(e.uv.x, e.uv.y);
            }}
            onPointerEnter={(e) => {
                if (!e.uv) return;
                easeFactor.current = 0.02;
                mousePosition.current.set(e.uv.x, e.uv.y);
                targetMousePosition.current.set(e.uv.x, e.uv.y);
            }}
            onPointerLeave={() => {
                easeFactor.current = 0.02;
                targetMousePosition.current.copy(prevPosition.current);
            }}
        >
            <planeGeometry args={[pw, ph, 1, 1]} />
            <shaderMaterial
                ref={matRef}
                vertexShader={textVertex}
                fragmentShader={textFragment}
                uniforms={uniforms}
                transparent={false}
                depthWrite={true}
            />
        </mesh>
    );
}