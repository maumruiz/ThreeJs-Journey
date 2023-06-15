import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Model(props) {
  const { nodes, materials } = useGLTF('/models/FlightHelmet/glTF/FlightHelmet.gltf')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Hose_low.geometry} material={materials.HoseMat} />
      <mesh geometry={nodes.RubberWood_low.geometry} material={materials.RubberWoodMat} />
      <mesh geometry={nodes.GlassPlastic_low.geometry} material={materials.GlassPlasticMat} />
      <mesh geometry={nodes.MetalParts_low.geometry} material={materials.MetalPartsMat} />
      <mesh geometry={nodes.LeatherParts_low.geometry} material={materials.LeatherPartsMat} />
      <mesh geometry={nodes.Lenses_low.geometry} material={materials.LensesMat} />
    </group>
  )
}

useGLTF.preload('/models/FlightHelmet/glTF/FlightHelmet.gltf')
