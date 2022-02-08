import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
//const geometry = new THREE.BoxGeometry(1, 1, 1, 4, 4, 4)


/* create BufferGeometry
    use Float32Array
    Can only store floats
    fixed length

    two ways of creating Float32Array

*/

// const positionsArray = new Float32Array(9)

// // First vertex
// positionsArray[0] = 0 //x vertex
// positionsArray[1] = 0 //y vertex
// positionsArray[2] = 0 //z vertex

// // Second vertex
// positionsArray[3] = 0
// positionsArray[4] = 1
// positionsArray[5] = 0

// // Third vertex
// positionsArray[6] = 1
// positionsArray[7] = 0
// positionsArray[8] = 0

const count = 150

const positionsArray = new Float32Array(count * 3 * 3)

for (let i = 0; i < count * 3 * 3; i++) {
    positionsArray[i] = (Math.random() - 0.5) * 4
}

const posAttribute = new THREE.BufferAttribute(positionsArray, 3)




// const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3)

const geometry = new THREE.BufferGeometry()

geometry.setAttribute('position', posAttribute)
// geometry.setAttribute('position', positionsAttribute)

// width, height, depth, widthSegment, heightSegment, depthSegment
const material = new THREE.MeshBasicMaterial({ color: 0x109eff,
wireframe: true //can use wireframe 
 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Sizes
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

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Animate
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()