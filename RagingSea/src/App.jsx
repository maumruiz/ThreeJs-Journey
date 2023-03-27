import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame, extend, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { DoubleSide } from 'three'
import { useControls } from 'leva'

import { SeaMaterial } from './shaders/sea/sea'
extend({ SeaMaterial })

function Sea(props) {
    const materialRef = useRef()

    const options = useControls('Sea', {
        uBigWavesElevation: {value: 0.15, min: 0, max: 1, step: 0.01},
        uBigWavesFrequency: {value: [4, 1.5], step: 0.01},
        uBigWavesSpeed: {value: 1.10, min: 0, max: 5, step: 0.01},

        uSmallWavesElevation: {value: 0.15, min: 0, max: 1, step: 0.01},
        uSmallWavesFrequency: {value: 1.15, min: 0, max: 10, step: 0.01},
        uSmallWavesSpeed: {value: 0.22, min: 0, max: 1, step: 0.01},
        uSmallWavesIterations: {value: 4, min: 0, max: 10, step: 0.01},

        uDepthColor: { r: 24, g: 102, b: 145 },
        uSurfaceColor: { r: 155, g: 216, b: 255 },
        uColorOffset: {value: 0.22, min: 0, max: 1, step: 0.01},
        uColorMultiplier: {value: 4, min: 0, max: 10, step: 1},
    })

    useFrame((state, delta) => materialRef.current.uTime = state.clock.elapsedTime)
    
    return (
        <mesh {...props}> 
            <planeGeometry args={[4, 2, 1024, 1024]} />
            <seaMaterial ref={materialRef} side={DoubleSide} {...options}/>
        </mesh>
    )
}

export default function App() {
    return (
        <Canvas camera={{position: [0, 1.5, 5.5]}}>
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
            <pointLight position={[-10, -10, -10]}  />
            <Sea position={[0, 0.5, 0]} rotation={[Math.PI / 2, 0, 0]} scale={5}/>
            <OrbitControls />
        </Canvas>
    )
}