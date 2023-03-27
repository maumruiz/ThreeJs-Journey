uniform vec3 uDepthColor;
uniform vec3 uSurfaceColor;
uniform float uColorOffset;
uniform float uColorMultiplier;

varying vec2 vUv;
varying float vElevation;

void main() {
    float mixStrenght = (vElevation + uColorOffset) * uColorMultiplier;
    vec3 mixedColor = mix(uSurfaceColor / 255.0, uDepthColor / 255.0, mixStrenght);
    gl_FragColor = vec4(mixedColor, 1.0);
}