export const vertexShader = `
    varying vec2 vUv;
    
    void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(positon, 1.0);
    }
`;

export const fragmentShader = `
    uniform sampler2D uTexture;
    uniform vec2 uMouse;
    uniform float uHover;
    uniform float uTime;
    
    varying vec2 vUv;
    
    void main() {
        vec2 uv = vUv;
        
        vec2 toMouse = uv - uMouse;
        float dist = length(vec2(toMouse.x * 4.0, toMouse.y));
        vec2 dir = normalize(toMouse + 0.0001);
        
        float wave = sin(dist * 20.0 - uTime * 6.5)
                    * exp(-dist * 4.5)
                    * 0.022
                    * uHover;
        vec2 dispUv  = uv + dir * wave;
        
        float ca = exp(-dist * 5.5) * 0.007 * uHover;
        float r = texture2D(uTexture, dispUv + dir * ca).a;
        float g = texture2D(uTexture, dispUv).a;
        float b = texture2D(uTexture, dispUv - dir * ca).a;
        
        float proximity = exp(-dist * 6.0) * uHover;
        vec3 baseColor = vec3(0.082);
        vec3 liftColor = vec3(0.46);
        vec3 color = mix(baseColor, liftColor, proximity * 0.45);
        
        float alpha = (r + g + b) / 3.0;
        
        gl_FragColor = vec4(color, alpha);
    }
`;