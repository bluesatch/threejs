import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap'
import * as dat from 'lil-gui'

// console.log(dat)

/*
Debug
*/

const gui = new dat.GUI()

// const gui = new dat.GUI({closed: true, width:400}) //creates new panel
// gui.hide()

// object to control colors 
const parameters = {
    color: 0x109eff,
    spinY: ()=> {
        // console.log('spin')
        gsap.to(mesh.rotation, {
            duration: 1,
            y: mesh.rotation.y + Math.PI * 2
        })
    },
    spinX: ()=> {
        gsap.to(mesh.rotation, {
            duration: 1,
            x: mesh.rotation.x + Math.PI * 2
        })
    },
    spinZ: ()=> {
        gsap.to(mesh.rotation, {
            duration: 1,
            z: mesh.rotation.z + Math.PI * 2
        })
    }
}



//add things/"tweaks" to panel
/*
    tweaks
        Range
        Color 
        Text 
        Checkbox (for booleans true of false)
        Select (choice from a list of values)
        Button 
        Folder (organize panel if you have too many elements)

        use gui.add() to add an element
            first parameter is an object
            second parameter is the property to tweak
*/

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Object
 */
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: parameters.color })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Debugging => adding elements
gui.add(mesh.position, 'x').min(-3).max(3).step(0.01).name('horizontal') //property, min, max, precision

gui.add(mesh.position, 'y')
    .min(-3)
    .max(3)
    .step(0.01)
    .name('elevation')
gui.add(mesh.position, 'z')
    .min(-3)
    .max(3)
    .step(0.01)
    .name('depth')

gui.add(mesh, 'visible')

gui.add(material, 'wireframe')

// to add color, use .addColor()
gui.addColor(parameters, 'color')
    .onChange(()=> {
        material.color.set(parameters.color)
    })


gui.add(parameters, 'spinY')
gui.add(parameters, 'spinX')
gui.add(parameters, 'spinZ')
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
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
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