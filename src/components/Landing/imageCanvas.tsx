"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import ImageMesh from "./imageMesh";

// This canvas replaces the Next.js <Image> inside .imageContainer.
// The parent div keeps position:relative, overflow:hidden, and clip-path —
// so GSAP's scroll-driven clip-path animation works exactly as before.
// The canvas just fills the same space, adding the shader on top.
export default function ImageCanvas() {
    return (
        <Canvas
            camera={{ position: [0, 0, 5], fov: 45, near: 0.1, far: 100 }}
            dpr={[1, 2]}
            gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        >
            {/*
        Suspense catches the useTexture() suspension in ImageMesh.
        null fallback = nothing renders until the texture is ready
        (the clipped div shows as empty for a frame, imperceptible at normal load speed)
      */}
            <Suspense fallback={null}>
                <ImageMesh />
            </Suspense>
        </Canvas>
    );
}