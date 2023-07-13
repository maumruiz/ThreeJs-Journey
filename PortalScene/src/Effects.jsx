import { useRef } from 'react'
import { Bloom, EffectComposer, Vignette, ChromaticAberration } from '@react-three/postprocessing'
import { useFrame } from '@react-three/fiber'
import { Vector2, Vector3 } from "three";

function randomFloat(low, high) {
	return low + Math.random() * (high - low);
}

let time = 0
let trigger = false

export default function Effects() {
    const chromaticEffect = useRef()

    const delay = new Vector2(2.0, 4.5)
	const duration = new Vector2(0.2, 0.7)
    const strength = new Vector2(0.002, 0.009)
    let breakpoint = new Vector3(
        randomFloat(delay.x, delay.y),
        randomFloat(duration.x, duration.y),
        randomFloat(strength.x, strength.y)
    )

    useFrame((state, delta) => {
        time += delta
        trigger = time > breakpoint.x

        if (time > breakpoint.x + breakpoint.y) {
            breakpoint.set(
                randomFloat(delay.x, delay.y),
                randomFloat(duration.x, duration.y),
                randomFloat(strength.x, strength.y)
            )
            time = 0
        }

        if(trigger) {
            const offsetTime = time - breakpoint.x
            const offset = breakpoint.z * Math.sin(offsetTime * (2*Math.PI*(1/breakpoint.y)))
            chromaticEffect.current.offset.x = offset
            chromaticEffect.current.offset.y = offset
        }
        else {
            chromaticEffect.current.offset.x = 0
            chromaticEffect.current.offset.y = 0
        }
    })

    return (
        <EffectComposer enabled={true}>
            <Bloom mipmapBlur luminanceThreshold={0} luminanceSmoothing={0.9} height={300} />
            <Vignette offset={0.3} darkness={0.6} />
            <ChromaticAberration ref={chromaticEffect} offset={[0.002, 0.002]} />
        </EffectComposer>
    )
}
