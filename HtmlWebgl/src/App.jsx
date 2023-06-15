import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stage } from '@react-three/drei'
import Model from './Model'

export default function App() {
    return (
        <Canvas>
            <Suspense fallback={null}>
                <Stage adjustCamera={2} intensity={0.5}>
                    <Model />
                </Stage>
            </Suspense>
            <OrbitControls  makeDefault />
        </Canvas>
    )
}