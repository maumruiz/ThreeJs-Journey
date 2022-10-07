import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()
gui.close()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const particleTexture = textureLoader.load('/textures/particles/8.png')

/**
 * Galaxy
 */
const parameters = {}
parameters.count = 50000
parameters.size = 0.05
parameters.radius = 0.01
parameters.branches = 3
parameters.spin = 1
parameters.randomness = 0.2
parameters.randomnessPower = 3
parameters.insideColor = '#ff6030'
parameters.outsideColor = '#1b3984'
parameters.bigbangRadius = 0.01

let geometry = null
let material = null
let points = null

const generateGalaxy = () => {
    // Destroy old galaxy
    if (points !== null) {
        geometry.dispose()
        material.dispose()
        scene.remove(points)
    }

    /**
    * Geometry
    */
    geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(parameters.count * 3)
    const colors = new Float32Array(parameters.count * 3)
    const colorInside = new THREE.Color(parameters.insideColor)
    const colorOutside = new THREE.Color(parameters.outsideColor)

    for (let i = 0; i < parameters.count; i++) {
        const i3 = i * 3

        const radius = Math.random() * parameters.radius
        const spinAngle = radius * parameters.spin
        const branchAngle = (i % parameters.branches) / parameters.branches * Math.PI * 2

        const randomX = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : - 1) * parameters.randomness * radius
        const randomY = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : - 1) * parameters.randomness * radius
        const randomZ = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : - 1) * parameters.randomness * radius

        positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX
        positions[i3 + 1] = randomY
        positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ

        const mixedColor = colorInside.clone()
        mixedColor.lerp(colorOutside, radius / parameters.radius)

        colors[i3] = mixedColor.r
        colors[i3 + 1] = mixedColor.g
        colors[i3 + 2] = mixedColor.b
    }
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    /**
     * Material
     */
    material = new THREE.PointsMaterial({
        size: parameters.size,
        sizeAttenuation: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        vertexColors: true
    })
    material.map = particleTexture

    points = new THREE.Points(geometry, material)
    scene.add(points)
}

let sphereGeometry = null
let sphereMaterial = null
let spherePoints = null
const generateBigBang = () => {
    // Destroy old galaxy
    if (spherePoints !== null) {
        sphereGeometry.dispose()
        sphereMaterial.dispose()
        scene.remove(spherePoints)
    }

    /**
    * Geometry
    */
    sphereGeometry = new THREE.BufferGeometry()
    const positions = new Float32Array(parameters.count * 3)
    const colors = new Float32Array(parameters.count * 3)
    const colorInside = new THREE.Color('#FAEDF0')
    const colorOutside = new THREE.Color('#4C0070')

    for (let i = 0; i < 20000; i++) {
        const i3 = i * 3

        // const angle = Math.random() * Math.PI * 2
        const radius = Math.random() * parameters.bigbangRadius

        var theta = Math.random() * Math.PI * 2
        var phi = Math.random() * Math.PI * 2
        
        positions[i3] = radius * Math.sin(theta) * Math.cos(phi);
        positions[i3 + 1] = radius * Math.sin(theta) * Math.sin(phi);
        positions[i3 + 2] = radius * Math.cos(theta);

        const mixedColor = colorInside.clone()
        mixedColor.lerp(colorOutside, radius / parameters.bigbangRadius)

        colors[i3] = mixedColor.r
        colors[i3 + 1] = mixedColor.g
        colors[i3 + 2] = mixedColor.b
    }
    sphereGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    sphereGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    /**
     * Material
     */
    sphereMaterial = new THREE.PointsMaterial({
        size: parameters.size,
        sizeAttenuation: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        vertexColors: true
    })
    sphereMaterial.map = particleTexture

    spherePoints = new THREE.Points(sphereGeometry, sphereMaterial)
    scene.add(spherePoints)
}

generateBigBang()
generateGalaxy()

gui.add(parameters, 'branches').min(2).max(20).step(1).onFinishChange(generateGalaxy)
gui.add(parameters, 'spin').min(- 5).max(5).step(0.001).onFinishChange(generateGalaxy)
gui.add(parameters, 'randomness').min(0).max(2).step(0.001).onFinishChange(generateGalaxy)
gui.add(parameters, 'randomnessPower').min(1).max(10).step(0.001).onFinishChange(generateGalaxy)
gui.addColor(parameters, 'insideColor').onFinishChange(generateGalaxy)
gui.addColor(parameters, 'outsideColor').onFinishChange(generateGalaxy)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 3
camera.position.y = 3
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    if (elapsedTime < 5){
        parameters.radius += Math.sqrt(elapsedTime) * 0.01
        generateGalaxy()
        points.rotation.y = elapsedTime * 2
    } else {
        points.rotation.y = 6 + (elapsedTime - 3) * 0.05
    }

    if(elapsedTime < 5) {
        spherePoints.scale.x += Math.sqrt(elapsedTime * 5)
        spherePoints.scale.y += Math.sqrt(elapsedTime * 5)
        spherePoints.scale.z += Math.sqrt(elapsedTime * 5)
        spherePoints.rotation.y = elapsedTime * 2
    } else {
        spherePoints.rotation.y =  10 + (elapsedTime - 5) * 0.005
    }

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()