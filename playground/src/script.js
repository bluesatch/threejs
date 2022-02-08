import './style.css'
import * as THREE from 'three'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'



// Cursor 
const cursor = {
    x: 0,
    y: 0
}

window.addEventListener('mousemove', (event)=> {
    cursor.x = event.clientX  / sizes.width - 0.5
    cursor.y = event.clientY / sizes.height - 0.5
})


// put colors in array 
const colors = [,
    'red', 'dodgerblue', 'green',
    'purple', 'orange', 'yellow',
    'chartreuse', 'magenta', 'pink', 'brown', 'blue', 'whitesmoke'
]

let min = -100;
let max = 100
// Canvas 
const canvas = document.getElementById('canvas')

// Scene 

const scene = new THREE.Scene();

// Objects
const group = new THREE.Group();

group.position.x = 1
group.position.y = 1
group.rotation.y = 0.4

scene.add(group);


colors.forEach(color => {
    const cube = new THREE.Mesh(
        new THREE.TorusGeometry(10, 3, 16, 100),
        new THREE.MeshBasicMaterial({
            color: color
            // color: 0xff0000
        })
    )

    cube.position.x = Math.random() * (max - min) + min
    cube.position.y = Math.random() * (max - min) + min
    cube.position.z = Math.random() * (max - min) + min
    cube.rotation.x = Math.random() * (max - min) + min
    cube.rotation.y = Math.random() * (max - min) + min

    group.add(cube)
})

// trying text
// const loader = new FontLoader();
// loader.load(
//     '/examples/fonts/helvetiker_regular.typeface.json', function ( font )  {
//         const text = new TextGeometry('Satch', {
//             font: font,
//             size: 80,
//             height: 5, 
//             curveSegments: 12,
//             bevelEnabled: true,
//             bevelThickness: 10,
//             bevelSize: 8,
//             bevelOffset: 0,
//             bevelSegments: 5
//         })
//     }
// )

// const loader = new FontLoader()

// const text = new TextGeometry('Satch', {
//     font: loader.load('examples/fonts/helvetiker_regular.typeface.json'),
//     size: 80,
//     height: 5,
//     curveSegments: 12,
//     bevelEnabled: true,
//     bevelThickness: 10,
//     bevelSize: 8,
//     bevelOffset: 0,
//     bevelSegments: 5
// })

// group.add(text)




// const redCube = new THREE.Mesh(
//     new THREE.BoxGeometry(1, 1, 1),
//     new THREE.MeshBasicMaterial({
//         color: 0xff0000
//     })
// )

// group.add(redCube)

// const blueCube = new THREE.Mesh(
//     new THREE.BoxGeometry(1, 1, 1),
//     new THREE.MeshBasicMaterial({
//         color: 0x109eff
//     })
// )

// blueCube.position.x = -2

// group.add(blueCube)

// const greenCube = new THREE.Mesh(
//     new THREE.BoxGeometry(1, 1, 1),
//     new THREE.MeshBasicMaterial({
//         color: 0x00ff00
//     })
// )

// greenCube.position.x = -2
// greenCube.position.y = -1.2

// group.add(greenCube)
// AxesHelper 
// const axesHelper = new THREE.AxesHelper()
// scene.add(axesHelper)

// Camera 
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', ()=> {
    // Update Sizes 
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight 

    // Update Camera
    camera.aspect = sizes.width / sizes.height 
    camera.updateProjectionMatrix() 

    // Update Renderer 
    rend.setSize(sizes.width, sizes.height)
    rend.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

window.addEventListener('dblclick', ()=> {
    const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement

    if (!fullscreenElement) {
        if (canvas.requestFullscreen) {
            canvas.requestFullscreen()
        } else if (canvas.webkitRequestFullScreen) {
            canvas.webkitRequestFullscreen()
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen()
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen()
        }
    }
})

const aspectRatio = sizes.width / sizes.height

const camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 1000)
camera.position.z = 150


camera.lookAt(group.position)

scene.add(camera);

// Controls 
const controls = new OrbitControls(camera, canvas)

controls.enableDamping = true
controls.target.x = 4
controls.autoRotate = true
controls.autoRotateSpeed = 1

// Render 



const rend = new THREE.WebGLRenderer({
    canvas
})
rend.setSize(sizes.width, sizes.height)

const clock = new THREE.Clock()

const tick = ()=> {

    const elapsedTime = clock.getElapsedTime()

    controls.update()
    rend.render(scene, camera)

    window.requestAnimationFrame(tick)
    
}

tick()


