import './style.css'
import * as THREE from 'three'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */
// const geometry = new THREE.BoxGeometry(1, 1, 1)
// const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
// const mesh = new THREE.Mesh(geometry, material)

// Create three groups
const group = new THREE.Group();
group.position.y = 1
// group.scale.y = 1.1
group.rotation.y = 0.4

scene.add(group)

const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({
        color: 0xff0000
    })
)

group.add(cube1)

const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({
        color: 0x00ff00
    })
)

cube2.position.x = -2

group.add(cube2)


const cube3 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({
        color: 0x109eff
    })
)
cube3.position.x = 2
// cube3.position.y = 2
// cube3.position.z = -1

group.add(cube3)

const cube4 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({
        color: 0xa020f0
    })
)

cube4.position.x = 4

group.add(cube4)

const cube5 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({
        color: 0xffa500
    })
)
cube5.position.x = -2
cube5.position.y = -1.1

group.add(cube5)

const cube6 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({
        color: 0xffff00
    })
)

cube6.position.y = -1.1

group.add(cube6)

const cube7 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({
        color: 0x808000
    })
)

cube7.position.x = 2
cube7.position.y = -1.1

group.add(cube7)

// Position 
// move Objects with position 
// mesh.position.x = 0.7
// mesh.position.y = -0.6
// mesh.position.z = 1

// y axis => vertical
// x axis => horizontal
// z axis => towards or away 
// properties can be added anywhere after creating the camera and before the render 
// before adding the scene is logical 

// mesh.position.set(0.7, -0.6, 1)
// scene.add(mesh)

// AxesHelper
const axesHelper = new THREE.AxesHelper()
scene.add(axesHelper)

// mesh.position.normalize()

// Scale 
// mesh.scale.x = 2
// mesh.scale.y = 0.5
// mesh.scale.z = 0.5

// mesh.scale.set(2, 0.5, 0.5)

// Rotation
// .reorder() determines which axis to change first; do before changing rotation 
// mesh.rotation.reorder('YXZ')
// mesh.rotation.x = Math.PI * 0.25
// mesh.rotation.y = Math.PI * 0.25
// to do a half rotation use mesh.position.y = Math.PI

/**
 * Sizes
 */
const sizes = {
    width: 800,
    height: 600
}

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
// camera.position.y = 1
// camera.position.x = 1

// console.log(mesh.position.distanceTo(camera.position))

scene.add(camera)

// lookAT()
// camera.lookAt(new THREE.Vector3(3, 0, 0))
camera.lookAt(group.position)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)