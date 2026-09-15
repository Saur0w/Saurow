import {
    positionLocal,
    uv,
    vec2,
    vec3,
    vec4,
    clamp,
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

// 1. Uniforms
export const uBend = uniform(0.0);
export const uPivot = uniform(0.0);
export const uCurve = uniform(0.4);
export const uMouse = uniform(new THREE.Vector2(0.5, 0.5));
export const uHover = uniform(0.0);

// Object-fit cover scaling & color toning controls
export const uCoverScale = uniform(new THREE.Vector2(200 / 220, 1.0));
export const uBrightness = uniform(0.86);
export const uContrast = uniform(1.12);

// 2. Dynamic mouse calculation (inverts Y if flipped backface)
const isBackFacingAngle = cos(uBend).lessThan(0.0);
const mouseY = select(isBackFacingAngle, float(1.0).sub(uMouse.y), uMouse.y);
const mouse = vec2(uMouse.x, mouseY);

// 3. Falloff & Hover ripple
const dist = length(uv().sub(mouse));
const falloff = smoothstep(0.25, 0.0, dist);
const faceDir = select(cos(uBend).greaterThanEqual(0.0), float(1.0), float(-1.0));
const hoverOffset = falloff.mul(0.2).mul(uHover).mul(faceDir);

// 4. Flex Curvature
const flex = sin(uv().y.mul(PI)).mul(uCurve).mul(sin(uBend));
const initialZ = positionLocal.z.add(hoverOffset).sub(flex);

// 5. Pivot Rotation along Y and Z
const distY = positionLocal.y.sub(uPivot);
const distZ = initialZ;

const newY = uPivot.add(distY.mul(cos(uBend))).sub(distZ.mul(sin(uBend)));
const newZ = distY.mul(sin(uBend)).add(distZ.mul(cos(uBend)));

export const flipVertexNode = vec3(positionLocal.x, newY, newZ);

// 6. Fragment color with object-fit cover, backface UV flip, and balanced color toning
export const createTextureNode = (map: THREE.Texture) => {
    // 1. Object-fit: cover transformation (centers image and scales UVs to prevent distortion)
    const centeredUv = uv().sub(vec2(0.5, 0.5));
    const coverUv = centeredUv.mul(uCoverScale).add(vec2(0.5, 0.5));

    // 2. Automatic backface UV flip for bend rotation
    const backUv = vec2(coverUv.x, float(1.0).sub(coverUv.y));
    const correctedUv = select(frontFacing, coverUv, backUv);

    // 3. Sample texture
    const sampled = texture(map, correctedUv);

    // 4. Color toning: correct excessive brightness and enrich contrast & shadows
    const tonedRgb = sampled.rgb.mul(uBrightness);
    const contrastedRgb = clamp(tonedRgb.sub(0.5).mul(uContrast).add(0.5), 0.0, 1.0);

    return vec4(contrastedRgb, sampled.a);
};