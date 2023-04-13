import { shaderMaterial } from '@react-three/drei'
import { AdditiveBlending } from 'three'

import vertex from './vertex.glsl'
import fragment from './fragment.glsl'

export const GalaxyMaterial = shaderMaterial(
    {
        depthWrite: false,
        blending: AdditiveBlending,
        vertexColors: true,
        uSize: 8,
        uTime: 0
    },
    vertex, fragment
)