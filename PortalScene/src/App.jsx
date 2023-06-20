import { useRef, useState, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Stage } from '@react-three/drei'
import Portal from './Portal'
import Fireflies from './Fireflies'

export default function App() {
    return (
        <Canvas camera={{position: [2.5, 2, 3]}}>
            <color attach={'background'} args={['#201919']}/>
            <Suspense fallback={null}>
                {/* <Environment preset="night" background /> */}
                {/* <Stage adjustCamera={1.5}> */}
                <Fireflies count={50}/>
                <Portal />
                {/* </Stage> */}
            </Suspense>
            <OrbitControls />
        </Canvas>
    )
}