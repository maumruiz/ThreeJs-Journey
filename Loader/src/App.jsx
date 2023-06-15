import { useRef, useState, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Stage, Environment } from '@react-three/drei'
import { Model } from './Model'
import { Loader } from './Loader'

function Box(props) {
    // This reference gives us direct access to the THREE.Mesh object
    const ref = useRef()
    // Hold state for hovered and clicked events
    const [hovered, hover] = useState(false)
    const [clicked, click] = useState(false)
    // Subscribe this component to the render-loop, rotate the mesh every frame
    useFrame((state, delta) => (ref.current.rotation.x += delta))
    // Return the view, these are regular Threejs elements expressed in JSX
    return (
        <mesh
            {...props}
            ref={ref}
            scale={clicked ? 1.5 : 1}
            onClick={(event) => click(!clicked)}
            onPointerOver={(event) => hover(true)}
            onPointerOut={(event) => hover(false)}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
        </mesh>
    )
}

export default function App() {
    return (
        <>
            <Loader />
            <Canvas>
                <OrbitControls />
                <Suspense fallback={null}>
                    <Environment preset="night" background />
                    <Stage adjustCamera={1.5} environment="night" intensity={1}>
                        <Model />
                    </Stage>
                </Suspense>
            </Canvas>
        </>
    )
}