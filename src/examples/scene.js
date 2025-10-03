import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/Addons.js'

const scene = new THREE.Scene()

const sizes = {
  width: 1000,
  height: 950,
}

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 2
camera.position.z = 3

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#scene'),
})
renderer.setSize(sizes.width, sizes.height)
const controls = new OrbitControls(camera, renderer.domElement)

const geometry = new THREE.BoxGeometry()
const material = new THREE.MeshBasicMaterial({ color: 'red' })
const cube = new THREE.Mesh(geometry, material)
scene.add(cube)

function animate() {
  requestAnimationFrame(animate)

  cube.rotation.y -= 0.01

  controls.update()
  renderer.render(scene, camera)
}

animate()
