// How to display two or more objects?

/* from Lesson 5, create a Group and put objects in group; also can, build objects in one 'line' as such: 
    const group = new THREE.Group();
    group.position.y = 1
    group.scale.y = 2
    group.rotation.y = 1

    scene.add(group)

    const cube1 = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshBasicMaterial({
            color: 0xff0000
        })
    )

    group.add(cube1)
*/
// Create Scene 

const scene = new THREE.Scene();

scene.background = new THREE.Color('#109eff');

// Create objects

const geometry = new THREE.BoxGeometry(1, 1, 1)
const material1 = new THREE.MeshBasicMaterial({
    color: 0x000000
})

const material2 = new THREE.MeshBasicMaterial({
    color: 0x00ff00
})

const blackCube = new THREE.Mesh(geometry, material1)

const greenCube = new THREE.Mesh(geometry, material2)

scene.add(blackCube, greenCube)

// Camera 
const sizes = {
    width: 800,
    height: 600
}

const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height)

camera.position.z = 3

camera.position.x = 2

scene.add(camera)

// Renderer

const canvas = document.getElementById('canvas')

const renderer = new THREE.WebGLRenderer({
    canvas
}) 

renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)
