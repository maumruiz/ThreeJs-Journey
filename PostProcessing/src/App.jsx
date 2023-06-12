import { useRef, useState, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, Stage } from '@react-three/drei'
import { Model } from "./Model"
import PostProcessing from './Effects'

export default function App() {
    return (
        <>
            <Canvas>
                <OrbitControls makeDefault autoRotate />
                <Suspense fallback={null}>
                    <PostProcessing />
                    <Environment preset="sunset" background />
                    <Stage adjustCamera={2.5} environment="sunset" intensity={1}>
                        <Model />
                    </Stage>
                </Suspense>
            </Canvas>
        </>
    )
}