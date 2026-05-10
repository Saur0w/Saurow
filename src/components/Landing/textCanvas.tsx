"use client";

import { Canvas } from "@react-three/fiber";
import TextMesh from "./textMesh";

export default function TextCanvas() {
    return (
        <Canvas
            // z = 5, fov = 45 → viewport.width ≈ 2 * 5 * tan(22.5°) ≈ 4.14 units
            // Use these numbers consistently when sizing the plane in TextMesh.
            camera={{ position: [0, 0, 5], fov: 45, near: 0.1, far: 100 }}
            dpr={[1, 2]}
            gl={{
                antialias       : true,
                alpha           : false,           // opaque — matches vanilla renderer
                powerPreference : "high-performance",
                // Keep the canvas background white (matches #ffffff in vanilla)
            }}
            style={{
                position : "absolute",
                inset    : 0,
                width    : "100%",
                height   : "100%",
            }}
            // White scene background so edges don't bleed
            onCreated={({ gl }) => {
                gl.setClearColor(0xffffff, 1);
            }}
        >
            <TextMesh />
        </Canvas>
    );
}