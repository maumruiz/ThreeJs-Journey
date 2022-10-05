import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Pane } from 'tweakpane';
import gsap from 'gsap'

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color('#2C3333')

// Pane
const pane = new Pane();

/**
 * Textures
 */
const loadingManager = new THREE.LoadingManager()
loadingManager.onStart = () => { console.log('texture loading started') }
loadingManager.onLoad = () => { console.log('texture loading finished') }
loadingManager.onProgress = () => { console.log('texture loading progressing') }
loadingManager.onError = () => { console.log('texture loading error') }

const textureLoader = new THREE.TextureLoader(loadingManager)

const colorTexture = textureLoader.load('/textures/door/color.jpg')
const checkerboardTexture = textureLoader.load('/textures/checkerboard-8x8.png')
const minecraftTexture = textureLoader.load('/textures/minecraft.png')
const doorColorTexture = textureLoader.load('/textures/door/color.jpg')
const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const doorHeightTexture = textureLoader.load('/textures/door/height.jpg')
const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg')
const doorAmbientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg')
const gradientTexture = textureLoader.load('/textures/gradients/3.jpg')

const cubeTextureLoader = new THREE.CubeTextureLoader()
const environmentMapTexture = cubeTextureLoader.load([
    '/textures/environmentMaps/1/px.jpg',
    '/textures/environmentMaps/1/nx.jpg',
    '/textures/environmentMaps/1/py.jpg',
    '/textures/environmentMaps/1/ny.jpg',
    '/textures/environmentMaps/1/pz.jpg',
    '/textures/environmentMaps/1/nz.jpg'
])

/**
 * Lights
 */
 const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
 scene.add(ambientLight)

 const pointLight = new THREE.PointLight(0xffffff, 0.5)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

/**
 * Objects
 */

const group = new THREE.Group()
scene.add(group)
const groupFolder = pane.addFolder({ title: 'Group' })
groupFolder.addInput(group.position, 'x', { label: 'Position x', min: -4, max: 1 })
groupFolder.addInput(group.position, 'z', { label: 'Position z', min: -4, max: 1 })

// const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2)
const geometry = new THREE.SphereGeometry(0.5, 16, 16)
const material = new THREE.MeshBasicMaterial({ color: '#ff0000', wireframe: true })
const mesh = new THREE.Mesh(geometry, material)
group.add(mesh)

const folder1 = pane.addFolder({ title: 'Mesh 1' })
folder1.addInput(mesh.scale, 'x', { label: 'Scale x', min: 0.1, max: 2 })
folder1.addInput(mesh.scale, 'y', { label: 'Scale y', min: 0.1, max: 2 })
folder1.addInput(mesh.scale, 'z', { label: 'Scale z', min: 0.1, max: 2 })
folder1.addInput(material, 'color', { label: 'Color', color: { type: 'float' } })
folder1.addButton({ title: 'Spin' }).on('click', () => {
    gsap.to(mesh.rotation, { duration: 1, y: mesh.rotation.y + 10 })
})

const geometry2 = new THREE.BoxGeometry(1, 1, 1)
const material2 = new THREE.MeshBasicMaterial({ color: '#00ff00' })
const mesh2 = new THREE.Mesh(geometry2, material2)
mesh2.position.x = -2
mesh2.rotation.reorder('YXZ')
group.add(mesh2)

const folder2 = pane.addFolder({ title: 'Mesh 2' })
folder2.addInput(mesh2.position, 'y', { label: 'Position y', min: -1, max: 1 })
folder2.addInput(material2, 'color', { label: 'Color', color: { type: 'float' } })
let animateMesh2 = true
folder2.addButton({ title: 'Stop Animation' }).on('click', () => {
    animateMesh2 = !animateMesh2
})

const geometry3 = new THREE.BufferGeometry()
const count = 500
const positionsArray = new Float32Array(count * 3 * 3) // 3 vertices (triangles) with 3 values (coordinates)
for (let i = 0; i < count * 3 * 3; i++) {
    positionsArray[i] = Math.random() - 0.5 // - 0.5 to center
}
const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3)
geometry3.setAttribute('position', positionsAttribute)
const material3 = new THREE.MeshBasicMaterial({ color: '#0000ff', wireframe: true })
const mesh3 = new THREE.Mesh(geometry3, material3)
mesh3.position.x = 2
group.add(mesh3)

const folder3 = pane.addFolder({ title: 'Mesh 3' })
folder3.addInput(mesh3, 'scale', { label: 'Scale', min: 0.1, max: 1 })
folder3.addInput(material3, 'color', { label: 'Color', color: { type: 'float' } })
folder3.addButton({ title: 'Explode' }).on('click', () => {
    gsap.to(mesh3.scale, { duration: 0.5, y: 3, x: 3, z: 3 })
    gsap.to(mesh3.scale, { duration: 0.5, y: 1, x: 1, z: 1, delay: 0.5 })
})

const geometry4 = new THREE.BoxGeometry(1, 1, 1)
const material4 = new THREE.MeshBasicMaterial({ map: colorTexture })
const mesh4 = new THREE.Mesh(geometry4, material4)
mesh4.position.y = 2
group.add(mesh4)

const folder4 = pane.addFolder({ title: 'Mesh 4' })
colorTexture.repeat.x = 2
colorTexture.repeat.y = 2
colorTexture.wrapS = THREE.RepeatWrapping
colorTexture.wrapT = THREE.RepeatWrapping
folder4.addInput(colorTexture.repeat, 'x', { label: 'Texture repeat x', min: 1, max: 5, step: 1 })
folder4.addInput(colorTexture.repeat, 'y', { label: 'Texture repeat y', min: 1, max: 5, step: 1 })
folder4.addInput(colorTexture.offset, 'x', { label: 'Texture offset x', min: 0, max: 1 })
folder4.addInput(colorTexture.offset, 'y', { label: 'Texture offset y', min: 0, max: 1 })
folder4.addInput(colorTexture, 'rotation', { label: 'Texture rotation', min: 0, max: Math.PI })

const geometry5 = new THREE.BoxGeometry(1, 1, 1)
const material5 = new THREE.MeshBasicMaterial({ map: checkerboardTexture })
const mesh5 = new THREE.Mesh(geometry5, material5)
mesh5.position.y = 2
mesh5.position.x = -2
group.add(mesh5)

// const folder5 = pane.addFolder({ title: 'Mesh 5' })
checkerboardTexture.magFilter = THREE.LinearFilter // Default
// let mesh5Filter = false
// folder5.addButton({ title: 'Change Filter' }).on('click', () => {
//     checkerboardTexture.magFilter = mesh5Filter ? THREE.LinearFilter : THREE.NearestFilter
//     mesh5Filter = !mesh5Filter
// })

const geometry6 = new THREE.BoxGeometry(1, 1, 1)
const material6 = new THREE.MeshBasicMaterial({ map: minecraftTexture })
const mesh6 = new THREE.Mesh(geometry6, material6)
mesh6.position.y = 2
mesh6.position.x = 2
minecraftTexture.generateMipmaps = false
minecraftTexture.magFilter = THREE.NearestFilter
group.add(mesh6)

const geometry7 = new THREE.TorusGeometry(0.3, 0.2, 16, 32)
const material7 = new THREE.MeshToonMaterial()
gradientTexture.minFilter = THREE.NearestFilter
gradientTexture.magFilter = THREE.NearestFilter
gradientTexture.generateMipmaps = false
material7.gradientMap = gradientTexture
const mesh7 = new THREE.Mesh(geometry7, material7)
mesh7.position.x = -2
mesh7.position.y = -2
group.add(mesh7)

const geometry8 = new THREE.PlaneGeometry(2, 2, 200, 200)
const material8 = new THREE.MeshStandardMaterial({ map: doorColorTexture })
material8.transparent = true
material8.alphaMap = doorAlphaTexture
material8.aoMap = doorAmbientOcclusionTexture
material8.aoMapIntensity = 1
material8.displacementScale = 0.05
material8.displacementMap = doorHeightTexture
material8.metalnessMap = doorMetalnessTexture
material8.roughnessMap = doorRoughnessTexture
material8.normalMap = doorNormalTexture
const mesh8 = new THREE.Mesh(geometry8, material8)
mesh8.geometry.setAttribute('uv2', new THREE.BufferAttribute(mesh8.geometry.attributes.uv.array, 2))
mesh8.position.y = -2
group.add(mesh8)

const folder8 = pane.addFolder({ title: 'Door' })
folder8.addInput(material8, 'aoMapIntensity', { label: 'Ambient Occlusion', min: 0, max: 1 })
folder8.addInput(material8, 'metalness', { label: 'Metalness', min: 0, max: 1 })
folder8.addInput(material8, 'roughness', { label: 'Roughness', min: 0, max: 1 })
folder8.addInput(material8, 'displacementScale', { label: 'Displacement Scale', min: 0, max: 1, step: 0.01 })

const geometry9 = new THREE.SphereGeometry(0.7, 16, 16)
const material9 = new THREE.MeshStandardMaterial()
material9.metalness = 1.0
material9.roughness = 0.0
material9.envMap = environmentMapTexture
const mesh9 = new THREE.Mesh(geometry9, material9)
mesh9.position.x = 2
mesh9.position.y = -2
group.add(mesh9)

const folder9 = pane.addFolder({ title: 'Environment Sphere' })
folder9.addInput(material9, 'metalness', { label: 'Metalness', min: 0, max: 1 })
folder9.addInput(material9, 'roughness', { label: 'Roughness', min: 0, max: 1 })

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
camera.position.z = 5
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

    if (animateMesh2) {
        mesh2.rotation.y = elapsedTime * Math.PI
        // mesh2.rotation.x = elapsedTime * Math.PI
        // mesh2.rotation.z = elapsedTime * Math.PI
    }

    mesh7.rotation.y = 0.1 * elapsedTime
    mesh7.rotation.x = 0.15 * elapsedTime
    
    mesh9.rotation.y = 0.1 * elapsedTime
    mesh9.rotation.x = 0.15 * elapsedTime


    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()