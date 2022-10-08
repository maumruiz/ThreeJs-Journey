import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'

let currentIntersect = null

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
 const textureLoader = new THREE.TextureLoader()
 const matcapTexture1 = textureLoader.load('/textures/matcap1.png')
 const matcapTexture2 = textureLoader.load('/textures/matcap2.png')
 const matcapTexture3 = textureLoader.load('/textures/matcap3.png')
 const matcapTexture4 = textureLoader.load('/textures/matcap4.png')
 const matcapTexture5 = textureLoader.load('/textures/matcap5.png')

 const simpleShadow = textureLoader.load('/textures/simpleShadow.jpg')

/**
 * Objects
 */
const object1 = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    new THREE.MeshMatcapMaterial({ matcap: matcapTexture5 })
)
object1.position.x = - 2
object1.name = 'Sphere 1'

const sphereShadow1 = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1),
    new THREE.MeshBasicMaterial({
        color: 0x000000,
        transparent: true,
        alphaMap: simpleShadow
    })
)
sphereShadow1.rotation.x = - Math.PI * 0.5
sphereShadow1.position.x = - 2
sphereShadow1.position.y = -0.5
scene.add(sphereShadow1)

const object2 = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    new THREE.MeshMatcapMaterial({ matcap: matcapTexture2 })
)
object2.name = 'Sphere 2'

const sphereShadow2 = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1),
    new THREE.MeshBasicMaterial({
        color: 0x000000,
        transparent: true,
        alphaMap: simpleShadow
    })
)
sphereShadow2.rotation.x = - Math.PI * 0.5
sphereShadow2.position.y = -0.5
scene.add(sphereShadow2)

const object3 = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    new THREE.MeshMatcapMaterial({ matcap: matcapTexture3 })
)
object3.position.x = 2
object3.name = 'Sphere 3'

const sphereShadow3 = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1),
    new THREE.MeshBasicMaterial({
        color: 0x000000,
        transparent: true,
        alphaMap: simpleShadow
    })
)
sphereShadow3.rotation.x = - Math.PI * 0.5
sphereShadow3.position.x = 2
sphereShadow3.position.y = -0.5
scene.add(sphereShadow3)

scene.add(object1, object2, object3)

/**
 * Raycaster
 */
 const raycaster = new THREE.Raycaster()

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
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
 * Mouse
 */
 const mouse = new THREE.Vector2(-1, -1)

 window.addEventListener('mousemove', (event) =>
 {
     mouse.x = event.clientX / sizes.width * 2 - 1
     mouse.y = - (event.clientY / sizes.height) * 2 + 1
 })

 let animate1 = false
 let animate2 = false
 let animate3 = false
 
 let animate1elapsed = 0
 
window.addEventListener('click', () => {
    if(currentIntersect)
    {
        switch(currentIntersect.object)
        {
            case object1:
                animate1 = !animate1
                break

            case object2:
                animate2 = !animate2
                break

            case object3:
                animate3 = !animate3
                break
        }
    }
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.y = 2
camera.position.z = 4
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
renderer.setClearColor('#EFEFEF')

/**
 * Animate
 */
const clock = new THREE.Clock()
let iObj1 = 0
let iObj2 = 0
let iObj3 = 0

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    raycaster.setFromCamera(mouse, camera)
    const objectsToTest = [object1, object2, object3]
    const intersects = raycaster.intersectObjects(objectsToTest)

    if(intersects.length)
    {
        if(!currentIntersect)
        {
            currentIntersect = intersects[0]
            const textElement = document.getElementById('text')
            textElement.innerHTML = currentIntersect.object.name
        }
    }
    else
    {
        if(currentIntersect)
        {
            currentIntersect = null
            const textElement = document.getElementById('text')
            textElement.innerHTML = 'Click on a Sphere'
        }
    }

    // Animate objects
    if(animate1) {
        iObj1 += 0.1
        object1.position.y = Math.abs(Math.sin(iObj1))
        sphereShadow1.material.opacity = (1 - object1.position.y) * 0.5
    }
    if(animate2) {
        iObj2 += 0.05
        object2.position.y = Math.abs(Math.sin(iObj2))
        sphereShadow2.material.opacity = (1 - object2.position.y) * 0.5
    }
    if(animate3) {
        iObj3 += 0.08
        object3.position.y = Math.abs(Math.sin(iObj3))
        sphereShadow3.material.opacity = (1 - object3.position.y) * 0.5
    }

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()