#define PI 3.1415926535897932384626433832795

varying vec2 vUv;

void main() {
    float strength = 0.1 / distance(vUv, vec2(0.5));
    vec3 blackColor = vec3(0.0);
    vec3 uvColor = vec3(vUv, 0.5);
    vec3 mixedColor = mix(blackColor, uvColor, strength);
    gl_FragColor = vec4(mixedColor, 1.0);
}