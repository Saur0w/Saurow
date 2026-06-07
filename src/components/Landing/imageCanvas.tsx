"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import ImageMesh from "./imageMesh";

export default function ImageCanvas() {
    return (
        <Canvas
            camera={{ position: [0, 0, 5], fov: 45, near: 0.1, far: 100 }}
            dpr={[1, 2]}
            gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        >
            <Suspense fallback={null}>
                <ImageMesh />
            </Suspense>
        </Canvas>
    );
}