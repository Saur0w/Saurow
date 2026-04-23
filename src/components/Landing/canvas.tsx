"use client";

import { Canvas } from "@react-three/fiber";
import { Preload } from "@react-three/drei";
import Obj from "./mesh";

export default function Scene() {
    return (
        <Canvas camera={{ position: [0, 0, 5], fov: 45, near: 0.1, far: 100 }}
                dpr={[1, 2]}
                gl={{
                    antialias: true,
                    alpha: true,
                    powerPreference: "high-performance",
                }}
                style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                }}
                >
            <Obj />
            <Preload all />
        </Canvas>
    )
}