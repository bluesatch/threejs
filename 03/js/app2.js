// First, create scene 
const scene = new THREE.Scene();

// Trying .background
scene.background = new THREE.Color('navy')


// Second, create object 
const geometry = new THREE.BoxGeometry(1, 1, 1)

const material = new THREE.MeshBasicMaterial({
    color: 0x109eff
})

const cube = new THREE.Mesh(geometry, material)

scene.add(cube);

// Third, create camera 
const sizes = {
    width: 800,
    height: 600
};

const camera = new THREE.PerspectiveCamera(50, sizes.width / sizes.height)

// will do position here:
camera.position.z = 4 //higher the number, the further it's being pushed away
camera.position.x = -1


scene.add(camera);

// Fourth, create Renderer 

const canvas = document.getElementById('canvas')

const renderer = new THREE.WebGLRenderer({
    canvas
})

renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)