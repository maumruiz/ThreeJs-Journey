import { Suspense } from 'react'
import { Perf } from 'r3f-perf'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Bloom, EffectComposer, Vignette, ChromaticAberration } from '@react-three/postprocessing'

import Portal from './Portal'
import Fireflies from './Fireflies'
import LoadbarSound from './Audio'
import { LoadScene } from './LoadScene'
import EnvMap from './EnvMap'

export default function App() {
    return (
        <>
            <LoadScene />
            <Canvas flat camera={{ position: [2.5, 1.5, 3] }}>
                <Perf position='top-left' />
                <color attach={'background'} args={['#1e2243']} />
                <Suspense fallback={null}>
                    <EnvMap />
                    <Fireflies count={30} />
                    <Portal />
                </Suspense>
                <OrbitControls enablePan={false} autoRotate autoRotateSpeed={0.2} 
                                minPolarAngle={0} maxPolarAngle={Math.PI / 2} maxDistance={15} />
                <EffectComposer enabled={true} multisampling={0}>
                    <Bloom mipmapBlur luminanceThreshold={0} luminanceSmoothing={0.9} height={300} />
                    <Vignette offset={0.3} darkness={0.5} />
                    <ChromaticAberration offset={[0.002, 0.002]} />
                </EffectComposer>
            </Canvas>
            <LoadbarSound />
        </>
    )
}