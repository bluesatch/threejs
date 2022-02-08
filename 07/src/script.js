import './style.css'
import * as THREE from 'three'

// import OrbitControls
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

// console.log(OrbitControls)


/*Cursor*/

const  cursor = {
    x: 0,
    y: 0
}
window.addEventListener('mousemove', (event)=> {

    cursor.x = event.clientX / sizes.width - 0.5
    cursor.y = -(event.clientY / sizes.height - 0.5)
    // console.log(cursor.y)
})
/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Sizes
const sizes = {
    width: 800,
    height: 600,
    // width: window.innerWidth,
    // height: window.innerHeight
}

// Scene
const scene = new THREE.Scene()

// Object
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
    new THREE.MeshBasicMaterial({ color: 0x109eff })
)
scene.add(mesh)

// Camera
/* PerspectiveCamera parameters 

    Field of View 
        vertical vision angle
        in degrees
        fov
    Aspect Ratio 
        width of the render divided by the height of the render
    Near and Far 
        correspond to how close and how far the camera can see
        any object closer than the near or futher than the far won't show up
        Do not use extreme values 
            cause z-fighting
    
*/

/* OrthographicCamera
    differs from PerspectiveCamera by its lack of perspective
    
    Parameters (left, right, top, bottom)
*/
const aspectRatio = sizes.width / sizes.height

const camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 1000)

// const camera = new THREE.OrthographicCamera(
//     -1 * aspectRatio, 
//     1 * aspectRatio, 
//     1, 
//     -1, 
//     0.1, 
//     100)
// camera.position.x = 2
// camera.position.y = 2
camera.position.z = 3

console.log(camera.position.length())
camera.lookAt(mesh.position)
scene.add(camera)

// Controls 
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.target.y = 2
// autoRotate property
controls.autoRotate = true
controls.autoRotateSpeed = 12
// controls.update()

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

// Animate
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    // mesh.rotation.y = elapsedTime;

    // Update camera 
    // camera.position.x = cursor.x * 10
    // camera.position.y = cursor.y * 10

    // Will be handled by OrbitControls
    // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3
    // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3
    // camera.position.y = cursor.y * 5

    // lookAt goes after setting the position
    // camera.lookAt(mesh.position)

    // Update controls 
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()

