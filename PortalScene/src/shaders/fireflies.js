import { shaderMaterial } from '@react-three/drei'

import vertex from './fireflies/vertex.glsl'
import fragment from './fireflies/fragment.glsl'

export const FirefliesMaterial = shaderMaterial(
    {
        uTime: 0,
        uPixelRatio: Math.min(window.devicePixelRatio, 2),
        uSize: 100,
    },
    vertex, fragment
)