import { useRef, useState } from 'react'
import { DirectionalLightHelper, CameraHelper } from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, useHelper } from '@react-three/drei'
import { useSpring, animated, config } from "@react-spring/three"
import { Physics, usePlane, useBox, useSphere, useContactMaterial } from '@react-three/cannon'
import { useControls, button, Leva } from 'leva'
import { v4 as uuidv4 } from 'uuid';
import './App.css'
import { useEffect } from 'react'

const groundMaterial = 'ground'
const boxMaterial = 'box'
const sphereMaterial = 'sphere'
const popcornMaterial = 'popcorn'

function Box(props) {
  const ref = useRef()
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)

  const { scale } = useSpring({
    scale: clicked ? 1.5 : 1,
    config: config.wobbly
  });

  useFrame((state, delta) => {
    ref.current.rotation.x += delta
  })

  return (
    <animated.mesh
      {...props}
      ref={ref}
      scale={scale}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </animated.mesh>
  )
}

function Plane(props) {
  const [ref] = usePlane(() => ({ material: groundMaterial, rotation: [-Math.PI / 2, 0, 0], ...props }))
  return (
    <mesh receiveShadow ref={ref}>
      <planeGeometry args={[1000, 1000]} />
      <meshStandardMaterial color="#f0f0f0" />
    </mesh>
  )
}

function Cube(props) {
  const xPos = (Math.random() - 0.5) * 3
  const yPos = 5
  const zPos = (Math.random() - 0.5) * 3

  const [ref, api] = useBox(() => ({
    position: [xPos, yPos, zPos],
    material: boxMaterial,
    mass: 1,
    ...props
  }))

  useContactMaterial(boxMaterial, groundMaterial, {
    friction: 0.8,
    restitution: 0.3,
  })


  return (
    <mesh castShadow ref={ref}>
      <boxGeometry />
      <meshStandardMaterial color="darkorange" />
    </mesh>
  )
}

function Sphere(props) {
  const xPos = (Math.random() - 0.5) * 3
  const yPos = 5
  const zPos = (Math.random() - 0.5) * 3

  const [ref, api] = useSphere(() => ({
    args: [0.6],
    position: [xPos, yPos, zPos],
    material: sphereMaterial,
    mass: 1,
    ...props
  }))

  useContactMaterial(sphereMaterial, groundMaterial, {
    friction: 0.65,
    restitution: 0.6,
  })

  return (
    <mesh castShadow ref={ref}>
      <sphereGeometry args={[0.6]} />
      <meshStandardMaterial color="teal" />
    </mesh>
  )
}

function Popcorn(props) {
  const xPos = (Math.random() - 0.5) * 3
  const yPos = 5
  const zPos = (Math.random() - 0.5) * 3

  const [ref, api] = useSphere(() => ({
    args: [0.4],
    position: [xPos, yPos, zPos],
    material: popcornMaterial,
    mass: 1,
    ...props
  }))

  useContactMaterial(popcornMaterial, groundMaterial, {
    friction: 0.9,
    restitution: 0.3,
  })

  useEffect(() => {
    const randX = (Math.random() - 0.5) * 4
    const randY = Math.random() * 5 + 8
    const randZ = (Math.random() - 0.5) * 4
    api.applyImpulse([randX, randY, randZ], [0,0,0])
  }, [])

  return (
    <mesh castShadow ref={ref}>
      <sphereGeometry args={[0.4]} />
      <meshStandardMaterial color="beige" />
    </mesh>
  )
}

function Lights() {
  const light = useRef()
  const shadowCameraRef = useRef()

  // useHelper(light, DirectionalLightHelper, 1, 'red')
  // useHelper(shadowCameraRef, CameraHelper)

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight castShadow ref={light} position={[50, 50, 5]}>
        <orthographicCamera ref={shadowCameraRef} attach="shadow-camera" left={-50} right={50} top={50} bottom={-50} />
      </directionalLight>
    </>
  )
}

function World() {
  const [spheres, setSpheres] = useState([uuidv4()])
  const [cubes, setCubes] = useState([uuidv4()])
  const [popcorns, setPopcorns] = useState([uuidv4()])

  let deltaFrames = 0

  const { flood, popCorns } = useControls({
    flood: false,
    popCorns: false,
    'Create Sphere': button(() => {
      setSpheres((currSpheres) => [...currSpheres, uuidv4()])
    }),
    'Create Cube': button(() => {
      setCubes((currCubes) => [...currCubes, uuidv4()])
    }),
    'Create Popcorn': button(() => {
      setPopcorns((currPopcorns) => [...currPopcorns, uuidv4()])
    }),
    'Reset': button(() => {
      setSpheres((currSpheres) => [])
      setCubes((currCubes) => [])
      setPopcorns((currCubes) => [])
    })
  })

  useFrame(({ clock }) => {
    deltaFrames += 1
    if (flood && deltaFrames % 10 === 0) {
      if (Math.random() < 0.5) {
        setSpheres((currSpheres) => [...currSpheres, uuidv4()])
      }
      else {
        setCubes((currCubes) => [...currCubes, uuidv4()])
      }
    }

    if (popCorns && deltaFrames % 8 === 0) {
      setPopcorns((currPopcorns) => [...currPopcorns, uuidv4()])
    }
  })

  return (

    <Physics allowSleep broadphase="SAP">
      <Plane></Plane>
      {/* <Box position={[-1.2, 1, 0]} />
        <Box position={[1.2, 1, 0]} /> */}

      {spheres.map((sphereId, i) => <Sphere key={sphereId}></Sphere>)}
      {cubes.map((cubeId, i) => <Cube key={cubeId}></Cube>)}
      {popcorns.map((popcornId, i) => <Popcorn key={popcornId}></Popcorn>)}

    </Physics>
  )
}

function App() {
  return (
    <>
      <Leva />
      <Canvas shadows camera={{ position: [3, 8, 15] }}>
        <Lights></Lights>
        <World></World>
        <OrbitControls />
      </Canvas>
    </>
  )
}

export default App
