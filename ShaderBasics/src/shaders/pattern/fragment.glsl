#define PI 3.1415926535897932384626433832795

varying vec2 vUv;

float random(vec2 st)
{
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

//	Classic Perlin 2D Noise 
//	by Stefan Gustavson
//
vec4 permute(vec4 x)
{
    return mod(((x*34.0)+1.0)*x, 289.0);
}
vec2 fade(vec2 t)
{
    return t*t*t*(t*(t*6.0-15.0)+10.0);
}

float cnoise(vec2 P)
{
    vec4 Pi = floor(P.xyxy) + vec4(0.0, 0.0, 1.0, 1.0);
    vec4 Pf = fract(P.xyxy) - vec4(0.0, 0.0, 1.0, 1.0);
    Pi = mod(Pi, 289.0); // To avoid truncation effects in permutation
    vec4 ix = Pi.xzxz;
    vec4 iy = Pi.yyww;
    vec4 fx = Pf.xzxz;
    vec4 fy = Pf.yyww;
    vec4 i = permute(permute(ix) + iy);
    vec4 gx = 2.0 * fract(i * 0.0243902439) - 1.0; // 1/41 = 0.024...
    vec4 gy = abs(gx) - 0.5;
    vec4 tx = floor(gx + 0.5);
    gx = gx - tx;
    vec2 g00 = vec2(gx.x,gy.x);
    vec2 g10 = vec2(gx.y,gy.y);
    vec2 g01 = vec2(gx.z,gy.z);
    vec2 g11 = vec2(gx.w,gy.w);
    vec4 norm = 1.79284291400159 - 0.85373472095314 * vec4(dot(g00, g00), dot(g01, g01), dot(g10, g10), dot(g11, g11));
    g00 *= norm.x;
    g01 *= norm.y;
    g10 *= norm.z;
    g11 *= norm.w;
    float n00 = dot(g00, vec2(fx.x, fy.x));
    float n10 = dot(g10, vec2(fx.y, fy.y));
    float n01 = dot(g01, vec2(fx.z, fy.z));
    float n11 = dot(g11, vec2(fx.w, fy.w));
    vec2 fade_xy = fade(Pf.xy);
    vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);
    float n_xy = mix(n_x.x, n_x.y, fade_xy.y);
    return 2.3 * n_xy;
}

void main() {
    float strength = 0.0;
    // gl_FragColor = vec4(vUv, 0.5, 1.0);
    // // Black white gradient horizontal
    // gl_FragColor = vec4(vUv.x, vUv.x, vUv.x, 1.0);
    // // // Black white gradient vertical
    // gl_FragColor = vec4(vUv.y, vUv.y, vUv.y, 1.0);
    // // Black white gradient vertical inverse
    // gl_FragColor = vec4(1.0 - vUv.y, 1.0 - vUv.y, 1.0 - vUv.y, 1.0);
    // // Black white gradient vertical exp
    // gl_FragColor = vec4(vUv.y * 10.0, vUv.y * 10.0, vUv.y * 10.0, 1.0);
    // // Black white gradient interchangeable
    // strength = mod(vUv.y * 10.0, 1.0);
    // // Black white gradient interchangeable step
    // strength = mod(vUv.y * 10.0, 1.0);
    // strength = step(0.5, strength);
    // // Black white grid
    // strength = step(0.8, mod(vUv.x * 10.0, 1.0));
    // strength += step(0.8, mod(vUv.y * 10.0, 1.0));
    // // Black white grid
    // strength = step(0.8, mod(vUv.x * 10.0, 1.0));
    // strength *= step(0.8, mod(vUv.y * 10.0, 1.0));
    // // Black white grid
    // strength = step(0.4, mod(vUv.x * 10.0, 1.0));
    // strength *= step(0.8, mod(vUv.y * 10.0, 1.0));
    // // Black white grid combined
    // float barX = step(0.4, mod(vUv.x * 10.0, 1.0));
    // barX *= step(0.8, mod(vUv.y * 10.0, 1.0));
    // float barY = step(0.8, mod(vUv.x * 10.0, 1.0));
    // barY *= step(0.4, mod(vUv.y * 10.0, 1.0));
    // strength = barX + barY;
    // // Black white crosses
    // float barX = step(0.4, mod(vUv.x * 10.0, 1.0));
    // barX *= step(0.8, mod(vUv.y * 10.0 + 0.2, 1.0));
    // float barY = step(0.8, mod(vUv.x * 10.0 + 0.2, 1.0));
    // barY *= step(0.4, mod(vUv.y * 10.0, 1.0));
    // strength = barX + barY; 
    // // Gradients
    // strength = abs(vUv.x - 0.5);
    // // Gradients
    // strength = min(abs(vUv.x - 0.5), abs(vUv.y - 0.5));
    // // Gradients
    // strength = max(abs(vUv.x - 0.5), abs(vUv.y - 0.5));
    // // Squares
    // strength = step(0.2, max(abs(vUv.x - 0.5), abs(vUv.y - 0.5)));
    // // Squares
    // float square1 = step(0.2, max(abs(vUv.x - 0.5), abs(vUv.y - 0.5)));
    // float square2 = 1.0 - step(0.25, max(abs(vUv.x - 0.5), abs(vUv.y - 0.5)));
    // strength = square1 * square2;
    // // Floor
    // strength = floor(vUv.x * 10.0) / 10.0;
    // // Floor grid
    // strength = floor(vUv.x * 10.0) / 10.0;
    // strength *= floor(vUv.y * 10.0) / 10.0;

    // //random
    // strength = random(vUv);
    // //random grid
    // vec2 gridUv = vec2(floor(vUv.x * 10.0) / 10.0, floor(vUv.y * 10.0) / 10.0);
    // strength = random(gridUv);

    // // lengths
    // strength = length(vUv);
    // strength = distance(vUv, vec2(0.5));
    // strength = 1.0 - distance(vUv, vec2(0.5));

    // strength = 0.02 / distance(vUv, vec2(0.5));

    // vec2 lightUv = vec2(
    //     vUv.x * 0.1 + 0.45,
    //     vUv.y * 0.5 + 0.25
    // );
    // strength = 0.02 / distance(lightUv, vec2(0.5));

    // // Wave circle
    // float angle = atan(vUv.x - 0.5, vUv.y - 0.5);
    // angle /= PI * 2.0;
    // angle += 0.5;
    // float sinusoid = sin(angle * 100.0);
    // float radius = 0.25 + sinusoid * 0.02;
    // strength = 1.0 - step(0.01, abs(distance(vUv, vec2(0.5)) - radius));

    // // PERLIN NOISE
    // strength = cnoise(vUv * 10.0);
    // strength = step(0.0, cnoise(vUv * 10.0));
    // strength = 1.0 - abs(cnoise(vUv * 10.0));
    // strength = sin(cnoise(vUv * 10.0) * 15.0);
    // strength = step(0.9, sin(cnoise(vUv * 10.0) * 15.0));

    // gl_FragColor = vec4(strength, strength, strength, 1.0);

    strength = step(0.7, sin(cnoise(vUv * 10.0) * 15.0));
    vec3 blackColor = vec3(0.0);
    vec3 uvColor = vec3(vUv, 0.5);
    vec3 mixedColor = mix(blackColor, uvColor, strength);
    gl_FragColor = vec4(mixedColor, 1.0);
}