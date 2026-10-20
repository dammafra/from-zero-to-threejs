import { VRMUtils, type VRM } from '@pixiv/three-vrm'
import { Mesh } from 'three'
import type { GLTF } from 'three-stdlib'

const setupDone = new WeakSet<GLTF>()

// Heavy one-time VRM optimizations, guarded so remounts don't redo them
export function setupAvatar(gltf: GLTF): VRM {
  const vrm = gltf.userData.vrm
  if (setupDone.has(gltf)) return vrm
  setupDone.add(gltf)

  gltf.scene.traverse(child => {
    child.castShadow = child instanceof Mesh && child.isMesh
  })

  VRMUtils.removeUnnecessaryVertices(gltf.scene)
  VRMUtils.combineSkeletons(gltf.scene)
  VRMUtils.combineMorphs(vrm)
  VRMUtils.rotateVRM0(vrm)
  return vrm
}
