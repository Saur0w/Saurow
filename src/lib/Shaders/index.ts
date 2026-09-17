import {
    positionLocal,
    uv,
    vec2,
    vec3,
    uniform,
    texture,
    sin,
    cos,
    PI,
    length,
    smoothstep,
    select,
    float,
    frontFacing,
} from 'three/tsl';
import * as THREE from 'three';

// Uniforms
export const uBend = uniform(0.0);
export const uPivot = uniform(0.0);
export const uCurve = uniform(0.4);
export const uMouse = uniform(new THREE.Vector2(0.5, 0.5));
export const uHover = uniform(0.0);

// Maintained for backwards compatibility with existing consumers
export const uHeight = uniform(1.0);
export const uCoverScale = uniform(new THREE.Vector2(1.0, 1.0));

// Mouse Y inversion on backface flip
const isBackFacingAngle = cos(uBend).lessThan(0.0);
const mouseY = select(isBackFacingAngle, float(1.0).sub(uMouse.y), uMouse.y);
const mouse = vec2(uMouse.x, mouseY);

// Hover interaction falloff & direction
const dist = length(uv().sub(mouse));
const falloff = smoothstep(0.25, 0.0, dist);
const faceDir = select(cos(uBend).greaterThanEqual(0.0), float(1.0), float(-1.0));
const hoverOffset = falloff.mul(0.2).mul(uHover).mul(faceDir);

// Curvature flex
const flex = sin(uv().y.mul(PI)).mul(uCurve).mul(sin(uBend));
const initialZ = positionLocal.z.add(hoverOffset).sub(flex);

// Pivot rotation along Y and Z
const distY = positionLocal.y.sub(uPivot);
const distZ = initialZ;

const newY = uPivot.add(distY.mul(cos(uBend))).sub(distZ.mul(sin(uBend)));
const newZ = distY.mul(sin(uBend)).add(distZ.mul(cos(uBend)));

export const flipVertexNode = vec3(positionLocal.x, newY, newZ);

// Fragment shader texture node with automatic backface UV flip
export const createTextureNode = (map: THREE.Texture) => {
    const backUv = vec2(uv().x, float(1.0).sub(uv().y));
    const correctedUv = select(frontFacing, uv(), backUv);
    return texture(map, correctedUv);
};