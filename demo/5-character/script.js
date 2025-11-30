import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/**
 * Base ***********************************************************************
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Helpers
const axesHelper = new THREE.AxesHelper(10)

const gridHelper = new THREE.GridHelper(10, 20)
gridHelper.position.y = -0.001

scene.add(axesHelper, gridHelper)

/**
 * Sizes **********************************************************************
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
  pixelRatio: window.devicePixelRatio,
}

window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight
  sizes.pixelRatio = window.devicePixelRatio

  // Update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  // Update renderer
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(sizes.pixelRatio)
})

/**
 * Camera *********************************************************************
 */
// Base camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 2
camera.position.y = 2
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer *******************************************************************
 */
const renderer = new THREE.WebGLRenderer({ canvas: canvas })
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(sizes.pixelRatio)

/**
 * Charachter *****************************************************************
 */
const character = new THREE.Group()
character.position.y = 0.35
character.scale.setScalar(0.5)
scene.add(character)

const characterBodyMaterial = new THREE.MeshBasicMaterial({ color: 'orange' })

const body = new THREE.Mesh(new THREE.BoxGeometry(), characterBodyMaterial)

const foot1 = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.8, 0.75, 16), characterBodyMaterial)
foot1.position.x = 0.25
foot1.position.y = -0.6
foot1.scale.setScalar(0.25)

const foot2 = foot1.clone()
foot2.position.x *= -1

const eye1 = new THREE.Mesh(
  new THREE.PlaneGeometry(1, 4),
  new THREE.MeshBasicMaterial({ color: 'black' }),
)
eye1.position.set(0.25, 0.1, 0.501)
eye1.scale.setScalar(0.125)

const eye2 = eye1.clone()
eye2.position.x *= -1

character.add(body, foot1, foot2, eye1, eye2)

/**
 * Animate ********************************************************************
 */
const timer = new THREE.Timer()

const tick = () => {
  timer.update()
  const elapsedTime = timer.getElapsed()
  const delta = timer.getDelta()

  // Update controls
  controls.update(delta)

  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()
