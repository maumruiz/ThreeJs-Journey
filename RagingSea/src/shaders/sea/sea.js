import { shaderMaterial } from '@react-three/drei'
import { Vector2 } from 'three'

import vertex from './vertex.glsl'
import fragment from './fragment.glsl'

export const SeaMaterial = shaderMaterial(
    { uTime: 0, uBigWavesElevation: 0.2, uBigWavesFrequency: new Vector2(10, 10), uBigWavesSpeed: 0.75 },
    vertex, fragment
)