"use client";

import { Canvas } from "@react-three/fiber";
import TextMesh from "./textMesh";

export default function TextCanvas() {
    return (
        <Canvas
            camera={{ position: [0, 0, 5], fov: 45, near: 0.1, far: 100 }}
            dpr={[1, 2]}
            gl={{
                antialias: true,
                alpha: false,
                powerPreference: "high-performance",
            }}
            style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
            }}
            onCreated={({ gl }) => {
                gl.setClearColor(0xffffff, 1);
            }}
        >
            <TextMesh />
        </Canvas>
    );
}