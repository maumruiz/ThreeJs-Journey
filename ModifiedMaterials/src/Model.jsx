import { useRef, useEffect } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function Model(props) {
  const materialRef = useRef()
  const shaderRef = useRef();
  const { nodes } = useGLTF("/models/LeePerrySmith/LeePerrySmith.glb")
  const textures = useTexture({
    map: "/models/LeePerrySmith/color.jpg",
    // normalMap: "/models/LeePerrySmith/normal.jpg"
  })

  useFrame((_, delta) => {
    if (!shaderRef.current) return
    shaderRef.current.uniforms.uTime.value += delta
  })

  useEffect(() => {
    materialRef.current.onBeforeCompile = (shader) => {
      shaderRef.current = shader
      shader.uniforms.uTime = { value: 0 }
      shader.vertexShader = shader.vertexShader.replace(
        '#include <common>',
        `
          #include <common>

          uniform float uTime;

          mat2 get2dRotateMatrix(float _angle)
          {
              return mat2(cos(_angle), - sin(_angle), sin(_angle), cos(_angle));
          }

        `
      )
      shader.vertexShader = shader.vertexShader.replace(
        '#include <begin_vertex>',
        `
          #include <begin_vertex>

          float angle = (position.y + uTime) * 0.9;
          mat2 rotateMatrix = get2dRotateMatrix(angle);
          transformed.xz = rotateMatrix * transformed.xz;
        `
      )
    }
  }, [])
  

  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        geometry={nodes.LeePerrySmith.geometry}
      >
        <meshDepthMaterial
          // ref={materialDepthRef}
          attach="customDepthMaterial"
          depthPacking={THREE.RGBADepthPacking}
        />
        <meshStandardMaterial ref={materialRef} {...textures}/>
        {/* <meshStandardMaterial {...textures}/> */}
      </mesh>
    </group>
  );
}

useGLTF.preload("/models/LeePerrySmith/LeePerrySmith.glb")