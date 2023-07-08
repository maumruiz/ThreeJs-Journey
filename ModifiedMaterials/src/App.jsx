import { useRef, useState, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Stage, Plane } from '@react-three/drei'
import { Model } from "./Model";

export default function App() {
    return (
        <Canvas shadows>
            <ambientLight intensity={0.5} />
            <directionalLight
                castShadow
                color="white"
                intensity={2}
                position={[2, 10, 5]}
            />
            <Suspense fallback={null}>
                {/* <Stage preset="rembrandt"> */}
                    <Model />
                    {/* <Plane args={[15, 15, 15]} position={[0, 0, -5]}/> */}
                {/* </Stage> */}
            </Suspense>
            <OrbitControls makeDefault />
        </Canvas>
    )
}