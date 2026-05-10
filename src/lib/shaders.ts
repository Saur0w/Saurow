export const textVertex =  `
  varying vec2 vUv;

  void main() {
    vUv         = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const textFragment = `
  varying vec2 vUv;

  uniform sampler2D u_texture;
  uniform vec2      u_mouse;
  uniform vec2      u_prevMouse;

  void main() {
    // Snap to a 40 × 40 grid
    vec2 gridUV        = floor(vUv * vec2(40.0, 40.0)) / vec2(40.0, 40.0);
    vec2 centerOfPixel = gridUV + vec2(1.0 / 40.0, 1.0 / 40.0);

    // How far / fast the mouse moved this frame
    vec2  mouseDirection       = u_mouse - u_prevMouse;

    // Distance from this grid cell's centre to the mouse
    vec2  pixelToMouse         = centerOfPixel - u_mouse;
    float pixelDistanceToMouse = length(pixelToMouse);

    // Cells close to the cursor get a strong pull; cells far away get nothing
    float strength = smoothstep(0.3, 0.0, pixelDistanceToMouse);

    // Shift UVs opposite to the mouse direction (gives the "dragging" look)
    vec2 uvOffset = strength * -mouseDirection * 0.3;
    vec2 uv       = vUv - uvOffset;

    gl_FragColor = texture2D(u_texture, uv);
  }
`;

export const imageVertex = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const imageFragment = `
  varying vec2 vUv;

  uniform sampler2D u_texture;

  void main() {
    gl_FragColor = texture2D(u_texture, vUv);
  }
`;