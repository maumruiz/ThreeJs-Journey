import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, Plane } from '@react-three/drei'
import { Burger } from './Burger'
import './App.css'

function App() {

  return (
    <Canvas shadows camera={{ position: [0, 1.5, 2.5] }}>
      <ambientLight intensity={0.5} />
      <spotLight castShadow instensity={1} position={[5, 5, 0]}></spotLight>
      <Plane receiveShadow args={[8, 8]} rotation={[-Math.PI / 2, 0, 0]} position-y={-0.5}>
        <meshStandardMaterial color="crimson" />
      </Plane>
      <Burger scale={[0.1, 0.1, 0.1]} position={[0,-0.5,0]}></Burger>
      {/* <Environment preset="city" /> */}
      <OrbitControls></OrbitControls>
    </Canvas>
  )
}

export default App
