import * as THREE from 'three'
import { useRef, useMemo } from 'react'
import { useFrame, extend } from '@react-three/fiber'

import { FirefliesMaterial } from './shaders/fireflies'
extend({ FirefliesMaterial })

export default function Fireflies({ count = 40 }) {
    const shader = useRef()
    const geometry = useRef()

    const [positionArray, scaleArray] = useMemo(() => {
        const positionArray = new Float32Array(count * 3)
        const scaleArray = new Float32Array(count)
        for (let i = 0; i < count; i++) {
            new THREE.Vector3(
                (Math.random() - 0.5) * 4,
                Math.random() * 1.5,
                (Math.random() - 0.5) * 4
            ).toArray(
                positionArray,
                i * 3,
            )
            scaleArray[i] = Math.random()
        }
        
        return [positionArray, scaleArray]
    }, [count])

    useFrame((state, delta) => {
        shader.current.uTime += delta / 2
    })

    return (
        <points>
            <bufferGeometry ref={geometry}>
                <bufferAttribute attach={'attributes-position'} count={count} array={positionArray} itemSize={3} />
                <bufferAttribute attach={'attributes-aScale'} count={count} array={scaleArray} itemSize={1} />
            </bufferGeometry>
            <firefliesMaterial ref={shader} transparent depthWrite={false} />
        </points>
    )
}