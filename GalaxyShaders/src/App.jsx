import { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame, extend, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { useControls } from 'leva'

import { GalaxyMaterial } from './shaders/galaxy/galaxy'
extend({ GalaxyMaterial })

function Galaxy(props) {
    const geometry = useRef()
    const materialRef = useRef()
    const { gl } = useThree()
    
    const options = useControls('Galaxy', {
        uSize: {value: 7.0, min: 0, max: 10.0, step: 0.01},
    })

    useEffect(() => {
        const parameters = {}
        parameters.count = 200000
        parameters.size = 0.005
        parameters.radius = 5
        parameters.branches = 3
        parameters.spin = 1
        parameters.randomness = 0.2
        parameters.randomnessPower = 3
        parameters.insideColor = '#ff6030'
        parameters.outsideColor = '#1b3984'

        const positions = new Float32Array(parameters.count * 3)
        const colors = new Float32Array(parameters.count * 3)
        const randomness = new Float32Array(parameters.count * 3)
        const scales = new Float32Array(parameters.count * 1)

        const insideColor = new THREE.Color(parameters.insideColor)
        const outsideColor = new THREE.Color(parameters.outsideColor)

        for (let i = 0; i < parameters.count; i++) {
            const i3 = i * 3

            // Position
            const radius = Math.random() * parameters.radius

            const branchAngle = (i % parameters.branches) / parameters.branches * Math.PI * 2

            randomness[i3] = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : - 1) * parameters.randomness * radius
            randomness[i3 + 1] = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : - 1) * parameters.randomness * radius
            randomness[i3 + 2] = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : - 1) * parameters.randomness * radius

            positions[i3] = Math.cos(branchAngle) * radius
            positions[i3 + 1] = 0
            positions[i3 + 2] = Math.sin(branchAngle) * radius

            // Color
            const mixedColor = insideColor.clone()
            mixedColor.lerp(outsideColor, radius / parameters.radius)

            colors[i3] = mixedColor.r
            colors[i3 + 1] = mixedColor.g
            colors[i3 + 2] = mixedColor.b

            // Scale
            scales[i] = Math.random()
        }

        geometry.current.setAttribute('position', new THREE.BufferAttribute(positions, 3))
        geometry.current.setAttribute('color', new THREE.BufferAttribute(colors, 3))
        geometry.current.setAttribute('aScale', new THREE.BufferAttribute(scales, 1))
        geometry.current.setAttribute('aRandomness', new THREE.BufferAttribute(randomness, 3))
    }, [])

    useFrame((state, delta) => materialRef.current.uTime = state.clock.elapsedTime)
    
    return (
        <points {...props}>
            <bufferGeometry ref={geometry} />
            <galaxyMaterial ref={materialRef} uSize={options.uSize * gl.getPixelRatio()}/>
        </points>
    )
}

export default function App() {
    return (
        <Canvas camera={{ position: [10, 8, 5] }}>
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
            <pointLight position={[-10, -10, -10]} />
            <Galaxy position={[0, 0, 0]} />
            <OrbitControls />
        </Canvas>
    )
}