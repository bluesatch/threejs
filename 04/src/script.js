import './style.css'
// import THREE.js here 
import * as THREE from 'three'

console.log(THREE)


const h1 = document.querySelector('.h1')

h1.innerText = 'Three.js-journey Lesson 4'

// console.log(THREE);

// Scene
const scene = new THREE.Scene();

// Object
// create a Mesh to create a red cube
// combination of a geometry (the shape) and a material (how it looks)

// Red cube 
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial( { color: 0xFF0000}) //has to be an aobject => 0xff0000 three.js class

const cube = new THREE.Mesh(geometry, material)

scene.add(cube)

// Camera 
// Two parameters 
    // Field of View => Vertical vision angle
        // In Degrees
    // Aspect Ratio => width of the render divided by the height of the render
    // create a sizes object with temporary values

const sizes = {
    width: 800,
    height: 600
}
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)

camera.position.z = 3
camera.position.x = 2
// camera.position.y = -1

scene.add(camera)

// Renderer
    // Render the scene from the camera point of View
    // Result drawn into a canvas
const canvas = document.querySelector('.webgl')
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
    // can just say canvas (same name)
})

renderer.setSize(sizes.width, sizes.height)

renderer.render(scene, camera)

// Nothing yet; camera is inside the cube! We need to move the camera backward

// use the following props to move an object: position, rotation, scale

