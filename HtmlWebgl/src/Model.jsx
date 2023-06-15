/*
Model author: JasperTobias (https://sketchfab.com/JasperTobias)
license: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
source: https://sketchfab.com/3d-models/lowpoly-earth-ce0cce9b528b47c7984bf0b2b600d705
title: LowPoly Earth
*/

import { useRef, useState } from 'react'
import { useGLTF, Html } from '@react-three/drei'
import { FaMapMarkerAlt } from 'react-icons/fa'

// A custom component which implements the logic to hide the content when not visible
function Marker({ children, ...props }) {
    const [hidden, setHidden] = useState()
    return (
        <Html
            transform
            occlude
            // The <Html> component can tell us when something is occluded (or not)
            onOcclude={setHidden}
            // We just interpolate the visible state into css opacity and transforms
            style={{
                transition: 'all 0.2s',
                opacity: hidden ? 0 : 1,
                transform: `scale(${hidden ? 0.25 : 1})`
            }}
            {...props}>
            {children}
        </Html>
    )
}

export default function Model(props) {
    const group = useRef()
    const [visible, setVisible] = useState(false)
    const { nodes, materials } = useGLTF('/earth.gltf')
    return (
        <group ref={group} {...props} dispose={null}>
            <group rotation={[-Math.PI / 2, 0, 0.05]} scale={100}>
                <mesh geometry={nodes['URF-Height_Lampd_Ice_0'].geometry} material={materials.Lampd_Ice} />
                <mesh
                    onPointerOver={(e) => e.stopPropagation()}
                    geometry={nodes['URF-Height_watr_0'].geometry}
                    material={materials.watr}
                    material-roughness={0}
                />
                <mesh geometry={nodes['URF-Height_Lampd_0'].geometry} material={materials.Lampd} material-color="lightgreen"></mesh>
                <Marker rotation={[0, Math.PI / 2, Math.PI / 8]} position={[0.8, 1.0, 0.2]}>
                    <FaMapMarkerAlt style={{ color: 'green' }} onMouseEnter={() => setVisible(true)} onMouseLeave={() => setVisible(false)}/>
                </Marker>
                <Marker rotation={[0, Math.PI / 2, Math.PI / 2]} position={[0, 0, 1.3]}>
                    <FaMapMarkerAlt style={{ color: 'indianred' }}/>
                </Marker>
                <Marker rotation={[0,  Math.PI / 2, Math.PI / 2]} position={[0.8, 1.2, 0.55]}>
                    <p style={{fontSize: '0.5em', opacity: visible ? 1 : 0}}>{'Mexico <3'}</p>
                </Marker>
            </group>
        </group>
    )
}

useGLTF.preload('/earth.gltf')
