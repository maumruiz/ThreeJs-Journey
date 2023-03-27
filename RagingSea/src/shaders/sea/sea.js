import { shaderMaterial } from '@react-three/drei'
import { Vector2 } from 'three'

import vertex from './vertex.glsl'
import fragment from './fragment.glsl'

export const SeaMaterial = shaderMaterial(
    {
        uTime: 0,
        uBigWavesElevation: 0.05,
        uBigWavesFrequency: new Vector2(10, 10),
        uBigWavesSpeed: 0.75,

        uSmallWavesElevation: 0.15,
        uSmallWavesFrequency: 3,
        uSmallWavesSpeed: 0.2,
        uSmallWavesIterations: 4.0,

        uDepthColor: { r: 0, g: 0, b: 255 },
        uSurfaceColor: { r: 128, g: 128, b: 255 },
        uColorOffset: 0.25,
        uColorMultiplier: 2
    },
    vertex, fragment
)