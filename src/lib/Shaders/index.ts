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
    sqrt
} from 'three/tsl';
import * as THREE from 'three';

// Uniforms
export const uBend = uniform(0.0);
export const uPivot = uniform(0.0);
export const uCurve = uniform(0.4);
export const uMouse = uniform(new THREE.Vector2(0.5, 0.5));
export const uHover = uniform(0.0);
export const uHeight = uniform(1.0);

// color toning & Object fit
export const uCoverScale = uniform(new THREE.Vector2(200 / 220, 1.0));
export const uBrightness = uniform(0.6);
export const uContrast = uniform(1.12);

const isBackFacingAngle = cos(uBend).lessThan(0.0);
const mouseY = select(isBackFacingAngle, float(1.0).sub(uMouse.y), uMouse.y);
const mouse = vec2(uMouse.x, mouseY);

// Hover
const dist = length(uv().sub(mouse));
const falloff = smoothstep(0.25, 0.0, dist);
const faceDir = select(cos(uBend).greaterThanEqual(0.0), float(1.0), float(-1.0));
const hoverOffset = falloff.mul(0.2).mul(uHover).mul(faceDir);

const bendCurve = uCurve.mul(sin(uBend));
const flex = sin(uv().y.mul(PI)).mul(bendCurve);
const initialZ = positionLocal.z.add(hoverOffset).sub(flex);

const curveSlope = bendCurve.mul(PI).div(uHeight);
const stretchFactor = sqrt(float(1.0).add(float(0.5).mul(curveSlope).mul(curveSlope)));

const distY = positionLocal.y.sub(uPivot).div(stretchFactor);
const distZ = initialZ;
const newY = uPivot.add(distY.mul(cos(uBend))).sub(distZ.mul(sin(uBend)));
const newZ = distY.mul(sin(uBend)).add(distZ.mul(cos(uBend)));


export const flipVertexNode = vec3(positionLocal.x, newY, newZ);

export const createTextureNode = (map: THREE.Texture) => {
    const centeredUv = uv().sub(vec2(0.5, 0.5));
    const coverUv = centeredUv.mul(uCoverScale).add(vec2(0.5, 0.5));
    const backUv = vec2(coverUv.x, float(1.0).sub(coverUv.y));
    const correctedUv = select(frontFacing, coverUv, backUv);
    const sampled = texture(map, correctedUv);
    const tonedRgb = sampled.rgb.mul(uBrightness);
    const contrastedRgb = clamp(tonedRgb.sub(0.5).mul(uContrast).add(0.5), 0.0, 1.0);

    return vec4(contrastedRgb, sampled.a);
};