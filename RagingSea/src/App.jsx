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
        uBigWavesElevation: {value: 0.2, min: 0, max: 1, step: 0.01},
        uBigWavesFrequency: [6, 10],
        uBigWavesSpeed: {value: 0.75, min: 0, max: 5, step: 0.01}
    })

    useFrame((state, delta) => materialRef.current.uTime = state.clock.elapsedTime)
    
    return (
        <mesh {...props}> 
            <planeGeometry args={[2, 2, 128, 128]} />
            <seaMaterial ref={materialRef} side={DoubleSide} {...options}/>
        </mesh>
    )
}

export default function App() {
    return (
        <Canvas camera={{position: [0.8, 1.5, 5.5]}}>
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
            <pointLight position={[-10, -10, -10]}  />
            <Sea position={[0.5, 0.5, 3]} rotation={[Math.PI / 2, 0, 0]}/>
            <OrbitControls />
        </Canvas>
    )
}