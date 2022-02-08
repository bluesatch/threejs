/*
    Import the goodies
*/
import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import * as dat from 'lil-gui'
import { Camera } from 'three'
// import { Renderer } from 'marked'

/*
 * Want site to read 'Satchwerk' and have rotating shapes around text
 */

/**
 * Base 
 */




//Cursor
const cursor = {
    x: 0,
    y: 0
}

window.addEventListener('mousemove', (event)=> {
    cursor.x = event.clientX / sizes.width - 0.5
    cursor.y = event.clientY / sizes.height
})

const colors = [
    'red', 'blue', 'green', 'yellow'
]

let min = -20
let max = 20

/**
 * Canvas 
 */

const canvas = document.querySelector('canvas.webgl')

/**
 * Scene
 */

const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

const matcapTexture = textureLoader.load('textures/matcaps/8.png')

// material 
const material = new THREE.MeshNormalMaterial()
/**
 * Fonts
 */
const fontLoader = new FontLoader()

fontLoader.load(
    '/fonts/helvetiker_regular.typeface.json',
    (font)=> {

        // text
        const text = 'Satchwerk.com coming soon!'
        // font material

        material.flatShading = true

        // Text Geometry 
        const textGeometry = new TextGeometry(
            text,
            {
                font,
                size: 0.3,
                height: 0.2,
                curveSegmennts: 12,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 5
            }
        )
        textGeometry.center()

        const displayText = new THREE.Mesh(
            textGeometry,
            material
        )

        scene.add(displayText)
    }

    // Donuts maybe??
)

/**
 * Objects
 */

const group = new THREE.Group()

group.position.x = 1
group.position.y = 1
group.rotation.y = 0.4

scene.add(group)

// instead of colors set number; use for loop
/*colors.forEach(color => {
    const sphere = new THREE.Mesh(
        new THREE.SphereGeometry(0.2, 16, 16),
        material
    )

    sphere.position.x = Math.random() * (max - min) + min
    sphere.position.y = Math.random() * (max - min) + min
    sphere.position.z = Math.random() * (max - min) + min

    sphere.rotation.x = Math.random() * (max - min) + min
    sphere.rotation.y = Math.random() * (max - min) + min

    group.add(sphere)
})
*/

for (let i = 0; i < 1000; i++) {
    const sphere = new THREE.Mesh(
        new THREE.SphereGeometry(0.2, 16, 16),
        material
    )

    sphere.position.x = Math.random() * (max - min) + min
    sphere.position.y = Math.random() * (max - min) + min
    sphere.position.z = Math.random() * (max - min) + min

    sphere.rotation.x = Math.random() * (max - min) + min
    sphere.rotation.y = Math.random() * (max - min) + min

    group.add(sphere)
}
/**
 * Sizes
 */

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', ()=> {
    //Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    //Update camera 
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    //Update renderer 
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

window.addEventListener('dblclick', ()=> {
    const fullScreenElement = document.fullscreenElement || document.webkitFullscreenElement

    if (!fullScreenElement) {
        if (canvas.requestFullScreen) {
            canvas.requestFullscreen()
        } else if (canvas.webkitRequestFullscreenElement) {
            canvas.webkitRequestFullscreenElement()
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen()
        } else if (document.webkitExitFullScreen) {
            document.webkitExitFullScreen()
        }
    }
})

const aspectRatio = sizes.width / sizes.height

/**
 * Camera
 */

//Base camera 
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)

camera.position.x = 1
camera.position.y = 1
camera.position.z = 6 

camera.lookAt(group.position)

scene.add(camera)

/**
 * Controls
 */
const controls = new OrbitControls(group, canvas)
controls.enableDamping = true
controls.target.x = 4
controls.autoRotate = true
controls.autoRotateSpeed = 1.5

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = ()=> {
    const elapsedTime = clock.getElapsedTime()

    //Update controls
    controls.update()

    // Render 
    renderer.render(scene, camera)

    // Call tick again on the next frame 
    window.requestAnimationFrame(tick)
}

console.log(controls)
// Debug
// const gui = new dat.GUI()
// gui.add(material, 'wireframe')
// gui.add(material, 'flatShading')
// gui.add(material, 'fog')
// gui.add(controls,'autoRotateSpeed').min(1).max(15).step(0.1).name('rotation speed')

tick()