import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'

/**
 * Base
 */

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color('#2C3639')

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const matcapTexture = textureLoader.load('/textures/matcaps/1.png')
const matcapTexture2 = textureLoader.load('/textures/matcaps/2.png')
const matcapTexture3 = textureLoader.load('/textures/matcaps/3.png')
const matcapTexture4 = textureLoader.load('/textures/matcaps/4.png')
const matcapTexture5 = textureLoader.load('/textures/matcaps/5.png')
const matcapTexture6 = textureLoader.load('/textures/matcaps/6.png')
const matcapTexture7 = textureLoader.load('/textures/matcaps/7.png')
const matcapTexture8 = textureLoader.load('/textures/matcaps/8.png')

/**
 * Fonts
 */
const fontLoader = new FontLoader()

fontLoader.load(
    '/fonts/helvetiker_regular.typeface.json',
    (font) => {
        const textGeometry = new TextGeometry(
            'Hello World',
            {
                font: font,
                size: 0.5,
                height: 0.2,
                curveSegments: 6,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 2
            }
        )
        const textMaterial = new THREE.MeshMatcapMaterial({ matcap: matcapTexture8 })
        const text = new THREE.Mesh(textGeometry, textMaterial)
        textGeometry.center()
        scene.add(text)
    }
)

/**
 * Object
 */
const material1 = new THREE.MeshMatcapMaterial({ matcap: matcapTexture })
const material2 = new THREE.MeshMatcapMaterial({ matcap: matcapTexture2 })
const material3 = new THREE.MeshMatcapMaterial({ matcap: matcapTexture3 })
const material4 = new THREE.MeshMatcapMaterial({ matcap: matcapTexture4 })
const material5 = new THREE.MeshMatcapMaterial({ matcap: matcapTexture5 })
const material6 = new THREE.MeshMatcapMaterial({ matcap: matcapTexture6 })
const material7 = new THREE.MeshMatcapMaterial({ matcap: matcapTexture7 })
const material8 = new THREE.MeshMatcapMaterial({ matcap: matcapTexture8 })
const materials = [material1, material2, material3, material4, material5, material6, material7, material8]

const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45)
const donuts = []
for (let i = 0; i < 100; i++) {
    const donut = new THREE.Mesh(donutGeometry, materials[Math.floor(Math.random() * 8)])
    donut.position.x = (Math.random() - 0.5) * 10
    donut.position.y = (Math.random() - 0.5) * 10
    donut.position.z = (Math.random() - 0.5) * 10
    donut.rotation.x = Math.random() * Math.PI
    donut.rotation.y = Math.random() * Math.PI
    const scale = Math.random()
    donut.scale.set(scale, scale, scale)
    donuts.push(donut)
    scene.add(donut)
}

const sphereGeometry = new THREE.SphereGeometry(0.3)
const spheres = []
for (let i = 0; i < 100; i++) {
    const sphere = new THREE.Mesh(sphereGeometry, materials[Math.floor(Math.random() * 8)])
    sphere.position.x = (Math.random() - 0.5) * 10
    sphere.position.y = (Math.random() - 0.5) * 10
    sphere.position.z = (Math.random() - 0.5) * 10
    sphere.rotation.x = Math.random() * Math.PI
    sphere.rotation.y = Math.random() * Math.PI
    const scale = Math.random()
    sphere.scale.set(scale, scale, scale)
    spheres.push(sphere)
    scene.add(sphere)
}

const cubeGeometry = new THREE.BoxGeometry(0.3,0.3,0.3)
const cubes = []
for (let i = 0; i < 100; i++) {
    const cube = new THREE.Mesh(cubeGeometry, materials[Math.floor(Math.random() * 8)])
    cube.position.x = (Math.random() - 0.5) * 10
    cube.position.y = (Math.random() - 0.5) * 10
    cube.position.z = (Math.random() - 0.5) * 10
    cube.rotation.x = Math.random() * Math.PI
    cube.rotation.y = Math.random() * Math.PI
    const scale = Math.random()
    cube.scale.set(scale, scale, scale)
    cubes.push(cube)
    scene.add(cube)
}

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
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
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

    for(let i=0; i<donuts.length; i++) {
        donuts[i].rotation.y = 0.2 * elapsedTime + Math.sin(i)
        donuts[i].rotation.x = 0.2 * elapsedTime + Math.cos(i)
    }

    for(let i=0; i<spheres.length; i++) {
        spheres[i].position.y += 0.001 * Math.sin(elapsedTime) * Math.sin(i)
        spheres[i].position.x += 0.001 * Math.cos(elapsedTime) * Math.sin(i)
        spheres[i].position.z += 0.001 * Math.sin(elapsedTime) * Math.sin(i)
    }

    for(let i=0; i<cubes.length; i++) {
        cubes[i].rotation.y = 0.2 * elapsedTime + Math.sin(i)
        cubes[i].rotation.x = 0.2 * elapsedTime + Math.cos(i)
    }

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()