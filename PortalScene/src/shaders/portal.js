import { shaderMaterial } from '@react-three/drei'
import * as THREE from 'three'

import vertex from './portal/vertex.glsl'
import fragment from './portal/fragment.glsl'

export const PortalMaterial = shaderMaterial(
    {
        uTime: 0,
        uColorStart: new THREE.Color('black'),
        uColorEnd: new THREE.Color('#110421')
    },
    vertex, fragment
)