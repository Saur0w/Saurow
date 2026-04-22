"use client";

import {} from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { Text } from "@react-three/drei";

export default function Mesh() {
    const planeRef = useRef<THREE.Mesh>(null);
    const textRef = useRef<any>(null);
    return (
      <group>
          <mesh ref={planeRef}>
              <planeGeometry args={[8, 2, 32, 32]} />
              <meshBasicMaterial
                  color="#f7f7f7"
                  transparent
                  opacity={0}
              />
          </mesh>
          <Text
              ref={textRef}
              font="/fonts.AVGARDD_2.woff"
              fontSize={1.1}
              letterSpacing={-0.04}
              anchorX="center"
              anchorY="middle"
              textAlign="center"
              position={[0, 0, 0.001]}
          >
              SAUROW
              <meshBasicMaterial color="#151515" />
          </Text>
      </group>
    );
}