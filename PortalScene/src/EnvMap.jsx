import { Sphere, useTexture } from '@react-three/drei'
import * as THREE from 'three'

function EnvMap() {
    const envmapTexture = useTexture('/envmap.png')
    envmapTexture.wrapS = THREE.RepeatWrapping
    envmapTexture.wrapT = THREE.RepeatWrapping
    envmapTexture.offset.x = 0.5

    return (
        <Sphere position={[0, 0, 0]} scale={20}>
            <meshBasicMaterial map={envmapTexture} side={THREE.BackSide}/>
        </Sphere>
    )
}

export default EnvMap