import { useTexture } from "@react-three/drei"
import {
    Bloom, BrightnessContrast, ChromaticAberration, DotScreen, EffectComposer, Glitch, Grid, HueSaturation, Noise, Pixelation, Scanline, Sepia, Vignette
} from "@react-three/postprocessing"
import { useControls } from "leva";
import { Tint } from "./customEffects/Tint";
import { Displacement } from "./customEffects/Displacement";
import { TextureOverlay } from "./customEffects/TextureOverlay"

export default function Effects() {
    const { futuristicInterface } = useTexture({
        futuristicInterface: "/textures/interfaceNormalMap.png"
      })

    const { dotScreen, dsAngle, dsScale } = useControls('DotScreen', {
        dotScreen: false,
        dsAngle: 1,
        dsScale: 1,
    }, { collapsed: true })

    const { glitch, gDelay, gDuration, gStrength } = useControls('Glitch', {
        glitch: false,
        gDelay: [1.5, 3.5],
        gDuration: [0.6, 1.0],
        gStrength: [0.3, 1.0],
    }, { collapsed: true })

    const { bloom, intensity, smoothing, threshold } = useControls('Bloom', {
        bloom: false,
        intensity: 1,
        smoothing: 1,
        threshold: 1
    }, { collapsed: true })

    const { noise } = useControls('Noise', {
        noise: false,
    }, { collapsed: true })

    const { vignette, offset, darkness } = useControls('Vignette', {
        vignette: false,
        offset: 1,
        darkness: 1
    }, { collapsed: true })

    const chromaticAberration = useControls('Chromatic Aberration', {
        enabled: false,
        offset: [1, 1]
    }, { collapsed: true })

    const grid = useControls('Grid', {
        enabled: false,
        scale: 1,
        lineWidth: 1
    }, { collapsed: true })

    const pixelation = useControls('Pixelation', {
        enabled: false,
        granularity: 1
    }, { collapsed: true })

    const scanLine = useControls('ScanLine', {
        enabled: false,
        density: 1
    }, { collapsed: true })

    const brightnessContrast = useControls('Brightness Contrast', {
        enabled: false,
        brightness: 1,
        contrast: 1
    }, { collapsed: true })

    const hueSaturation = useControls('Hue Saturation', {
        enabled: false,
        hue: 1,
        saturation: 1
    }, { collapsed: true })

    const sepia = useControls('Sepia', {
        enabled: false,
        intensity: 1
    }, { collapsed: true })

    const tint = useControls('Tint', {
        enabled: false,
        settings: [1, 1, 1]
    }, { collapsed: true })

    const displacement = useControls('Displacement', {
        enabled: false,
        settings: [1, 1, 1]
    }, { collapsed: true })

    const textureOverlay = useControls('Texture Overlay', {
        enabled: false,
        settings: [1, 1, 1]
    }, { collapsed: true })

    return (
        <EffectComposer multisampling={0} enabled={dotScreen || glitch || bloom || noise || vignette || chromaticAberration.enabled || grid.enabled ||
            pixelation.enabled || scanLine.enabled || brightnessContrast.enabled || hueSaturation.enabled || sepia.enabled || tint.enabled || displacement.enabled || textureOverlay.enabled}>
            {dotScreen && <DotScreen angle={Math.PI * dsAngle} scale={dsScale} />}
            {glitch && <Glitch delay={gDelay} duration={gDuration} gStrength={gStrength} />}
            {bloom && <Bloom intensity={15 * intensity} luminanceSmoothing={0.9 * smoothing} luminanceThreshold={0.6 * threshold} />}
            {vignette && <Vignette offset={0.4 * offset} darkness={0.7 * darkness} />}
            {noise && <Noise />}
            {chromaticAberration.enabled && <ChromaticAberration offset={[0.02 * chromaticAberration.offset[0], 0.002 * chromaticAberration.offset[1]]} />}
            {grid.enabled && <Grid scale={grid.scale} lineWidth={grid.lineWidth} />}
            {pixelation.enabled && <Pixelation granularity={5 * pixelation.granularity} />}
            {scanLine.enabled && <Scanline density={scanLine.density} />}
            {brightnessContrast.enabled && <BrightnessContrast brightness={0.1 * brightnessContrast.brightness} contrast={0.5 * brightnessContrast.contrast} />}
            {hueSaturation.enabled && <HueSaturation hue={Math.PI * 0.25 * hueSaturation.hue} saturation={Math.PI * 0.25 * hueSaturation.saturation} />}
            {sepia.enabled && <Sepia intensity={sepia.intensity} />}
            {tint.enabled && <Tint tint={tint.settings} />}
            {displacement.enabled && <Displacement args={displacement.settings} />}
            {textureOverlay.enabled && <TextureOverlay normalMap={futuristicInterface} args={textureOverlay.settings} /> }
        </EffectComposer>
    )
}