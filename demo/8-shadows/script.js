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
axesHelper.visible = false

const gridHelper = new THREE.GridHelper(10, 20)
gridHelper.position.y = -0.001
gridHelper.visible = false

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
camera.position.y = 8
camera.position.z = 10
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
renderer.shadowMap.enabled = true

/**
 * Lights *********************************************************************
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('white', 0.5)
scene.add(ambientLight)

// Directional light
const directionalLight = new THREE.DirectionalLight('white', 3)
directionalLight.position.set(2, 4, 4)
directionalLight.castShadow = true
scene.add(directionalLight)

/**
 * Player *********************************************************************
 */
const player = new THREE.Group()
player.position.y = 0.35
player.scale.setScalar(0.5)
scene.add(player)

const playerBodyMaterial = new THREE.MeshStandardMaterial({
  color: 'orange',
  roughness: 0.7,
})

const body = new THREE.Mesh(new THREE.BoxGeometry(), playerBodyMaterial)
body.castShadow = true

const foot1 = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.8, 0.75, 16), playerBodyMaterial)
foot1.position.x = 0.25
foot1.position.y = -0.6
foot1.scale.setScalar(0.25)

const foot2 = foot1.clone()
foot2.position.x *= -1

const eye1 = new THREE.Mesh(
  new THREE.PlaneGeometry(1, 4),
  new THREE.MeshStandardMaterial({
    color: 'black',
    roughness: 0.1,
  })
)
eye1.position.set(0.25, 0.1, 0.501)
eye1.scale.setScalar(0.125)

const eye2 = eye1.clone()
eye2.position.x *= -1

player.add(body, foot1, foot2, eye1, eye2)

/**
 * Grid ***********************************************************************
 */
const grid = new THREE.Group()
grid.position.set(-3.5, -0.115, -2.5)
scene.add(grid)

const tileGeometry = new THREE.BoxGeometry(1, 0.25, 1)
const tileMaterial = new THREE.MeshStandardMaterial({
  color: 'dodgerblue',
  roughness: 0,
  transparent: true,
  opacity: 0.9,
})

const width = 8
const height = 6

for (let i = 0; i < width; i++) {
  for (let j = 0; j < height; j++) {
    const tile = new THREE.Mesh(tileGeometry, tileMaterial)
    tile.position.x = i
    tile.position.z = j
    tile.scale.setScalar(0.92)
    tile.receiveShadow = true
    grid.add(tile)
  }
}

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
