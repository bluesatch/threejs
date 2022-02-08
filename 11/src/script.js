import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'


/*Textures  */
// get image
// const imageSource = '/color.jpg'

// loading the image 
// const image = new Image()
// const texture = new THREE.Texture(image)


// // image.onload = ()=> {
// //     // transform image into a texture 
// //     // console.log('image loaded')
// // }

// image.addEventListener('load', ()=> {
//     texture.needsUpdate = true
// })

// image.src = '/textures/door/color.jpg'

// Use TextureLoader
const loadingManager = new THREE.LoadingManager()

loadingManager.onStart =()=> {
    console.log('on start')
}

loadingManager.onLoaded =()=> {
    console.log('on loaded')
}

loadingManager.onProgress =()=> {
    console.log('on Progress')
}

loadingManager.onError =()=> {
    console.log('on Error')
}


const textureLoader = new THREE.TextureLoader(loadingManager)
// one texture loader can load multiple textures
// const texture = textureLoader.load(
//     '/textures/door/color.jpg',
//     ()=> {
//         console.log('load')
//     },
//     ()=> {
//         console.log('progress')
//     },
//     ()=> {
//         console.log('error')
//     }
// )

const colorTexture = textureLoader.load('/textures/minecraft.png')
const alphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const heightTexture = textureLoader.load('/textures/door/height.jpg')
const normalTexture = textureLoader.load('/textures/door/normal.jpg')
const ambientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const metalnessTexture = textureLoader.load('/texture/door/metalness.jpg')
const roughnessTexture = textureLoader.load('/texture/door/roughness.jpg')

// colorTexture.repeat.x = 2
// colorTexture.repeat.y = 3
// colorTexture.wrapS = THREE.RepeatWrapping
// colorTexture.wrapT = THREE.RepeatWrapping
// can also use MirrorWrapping 

// colorTexture.offset.x = 0.5
// colorTexture.offset.y = 0.5

// colorTexture.rotation = Math.PI * 0.25
// colorTexture.center.x = 0.5
// colorTexture.center.y = 0.5

colorTexture.generateMipmaps = false
colorTexture.minFilter = THREE.NearestFilter
colorTexture.magFilter = THREE.NearestFilter

// if using NearestFilter on minFilter, we don't need the mipmaps 


/**
 * Can also use:
 *  THREE.LinearFilter
 *  THREE.NearestMipmapNearestFilter
 *  THREE.NearestMipmapLinearFilter
 *  THREE.LinearMipmapNearestFilter
 *  THREE.LinearMipmapLinearFilter (default)
 */

// Three things to consider when preparing  textures:
    // The weight 
        // TinyPNG.com can compress image 
    // The size of the file 
        // Try to reduce the size of your image as much as possible
        // use dimensions that have a power of 2
    // The data

/*By default, the texture doesn't repeat and the last pixel gets stretched */

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
const geometry = new THREE.BoxBufferGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ map: colorTexture })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// UV unwrapping => it's like unwrapping an origami
console.log(geometry.attributes.uv)
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
camera.position.x = 1
camera.position.y = 1
camera.position.z = 1
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