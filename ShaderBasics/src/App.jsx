import { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame, extend } from '@react-three/fiber'
import { OrbitControls, Sparkles, shaderMaterial, useGLTF, useTexture } from '@react-three/drei'

import * as THREE from 'three'
import { useControls } from 'leva'

import testVertexShader from './shaders/test/vertex.glsl'
import testFragmentShader from './shaders/test/fragment.glsl'

import flagVertex from './shaders/flag/vertex.glsl'
import flagFragment from './shaders/flag/fragment.glsl'

import patternVertex from './shaders/pattern/vertex.glsl'
import patternFragment from './shaders/pattern/fragment.glsl'

import pattern2Vertex from './shaders/pattern2/vertex.glsl'
import pattern2Fragment from './shaders/pattern2/fragment.glsl'

import pattern3Vertex from './shaders/patterm3/vertex.glsl'
import pattern3Fragment from './shaders/patterm3/fragment.glsl'

import './App.css'

const SpikesMaterial = shaderMaterial(
    {},
    testVertexShader, testFragmentShader
)
extend({ SpikesMaterial })

const FlagMaterial = shaderMaterial(
    { uFrequency: 10.0, uTime: 0, uTexture: new THREE.Texture() },
    flagVertex, flagFragment
)
extend({ FlagMaterial })

const PatternMaterial = shaderMaterial(
    {  },
    patternVertex, patternFragment
)
extend({ PatternMaterial })

const Pattern2Material = shaderMaterial(
    {  },
    pattern2Vertex, pattern2Fragment
)
extend({ Pattern2Material })

const Pattern3Material = shaderMaterial(
    {  },
    pattern3Vertex, pattern3Fragment
)
extend({ Pattern3Material })

function Spikes(props) {
    const geometryRef = useRef(null)

    useEffect(() => {
        const count = geometryRef.current.attributes.position.count
        const randoms = new Float32Array(count)

        for (let i = 0; i < count; i++) {
            randoms[i] = Math.random()
        }

        geometryRef.current.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 1))
    }, [])
    return (
        <mesh
            {...props}
        >
            <planeGeometry ref={geometryRef} args={[1, 1, 32, 32]} />
            <spikesMaterial side={THREE.DoubleSide}/>
        </mesh>
    )
}

function Flag(props) {
    const material = useRef()
    const options = useControls('Flag', {
        frequency: { x: 10, y: 5 }
    })

    const flag = useTexture('/mexicoh.png')

    useFrame((state, delta) => (material.current.uTime += delta))

    return (
        <mesh
            {...props}
        >
            <planeGeometry args={[1, 1, 32, 32]} />
            <flagMaterial ref={material} uFrequency={options.frequency} uTexture={flag} side={THREE.DoubleSide}/>
        </mesh>
    )
}

function Patterns(props) {
    const material = useRef()

    return (
        <mesh
            {...props}
        >
            <planeGeometry args={[1, 1, 32, 32]} />
            <patternMaterial ref={material} side={THREE.DoubleSide}/>
        </mesh>
    )
}

function Pattern2(props) {
    const material = useRef()

    return (
        <mesh
            {...props}
        >
            <planeGeometry args={[1, 1, 32, 32]} />
            <pattern2Material ref={material} side={THREE.DoubleSide}/>
        </mesh>
    )
}

function Pattern3(props) {
    const material = useRef()

    return (
        <mesh
            {...props}
        >
            <planeGeometry args={[1, 1, 32, 32]} />
            <pattern3Material ref={material} side={THREE.DoubleSide}/>
        </mesh>
    )
}

function App() {

    return (
        <Canvas>
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <Spikes position={[-4, 2, 0]} scale={2} />
            <Flag position={[0, 2, 0]} scale={[3,2/3*3,3]} />
            <Patterns position={[4, 2, 0]} scale={2} />
            <Pattern2 position={[-4, -1.5, 0]} scale={2} />
            <Pattern3 position={[0, -1.5, 0]} scale={2} />
            <OrbitControls />
        </Canvas>
    )
}

export default App
