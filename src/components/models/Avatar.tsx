import { useMixamoAnimation } from '@hooks/use-mixamo-animation'
import { VRM, VRMLoaderPlugin, VRMUtils } from '@pixiv/three-vrm'
import { CameraControls, useGLTF } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useRef, type JSX } from 'react'
import {
  AnimationMixer,
  MathUtils,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  Quaternion,
} from 'three'

export function Avatar(props: JSX.IntrinsicElements['mesh']) {
  // @ts-expect-error GLTFLoaderPlugin version mismatch
  const gltf = useGLTF('./models/avatar.vrm', true, true, loader => loader.register(parser => new VRMLoaderPlugin(parser, { autoUpdateHumanBones: true }))) //prettier-ignore
  const clip = useMixamoAnimation('./models/waving.fbx', gltf.userData.vrm)

  const { camera, controls } = useThree()
  const avatar = useRef<VRM>(null)
  const animationMixer = useRef<AnimationMixer>(null)

  const neutralQuat = useRef<Quaternion>(null!)
  const lastQuat = useRef<Quaternion>(null!)
  const targetQuat = useRef<Quaternion>(null!)

  useEffect(() => {
    if (!gltf) return
    gltf.scene.traverse(child => {
      if (child instanceof Mesh && child.isMesh) {
        child.castShadow = true
        child.frustumCulled = false

        if (child.material && child.material instanceof MeshBasicMaterial) {
          const newMat = new MeshStandardMaterial()

          newMat.map = child.material.map
          newMat.color.copy(child.material.color)
          newMat.transparent = child.material.transparent
          newMat.opacity = child.material.opacity
          newMat.side = child.material.side
          newMat.name = child.material.name
          newMat.alphaTest = child.material.alphaTest

          child.material = newMat
        }
      }
    })

    const vrm = gltf.userData.vrm
    VRMUtils.removeUnnecessaryVertices(gltf.scene)
    VRMUtils.combineSkeletons(gltf.scene)
    VRMUtils.combineMorphs(vrm)
    VRMUtils.rotateVRM0(vrm)
    avatar.current = vrm

    // save neutral head pose
    const head = vrm.humanoid!.getRawBoneNode('head')!
    neutralQuat.current = head.quaternion.clone()
    lastQuat.current = head.quaternion.clone()
  }, [gltf])

  useEffect(() => {
    if (!clip || !avatar.current) return
    const mixer = new AnimationMixer(avatar.current.scene)
    const action = mixer.clipAction(clip)
    action.reset().play()
    animationMixer.current = mixer
  }, [clip])

  useFrame((_, delta) => {
    const cameraControls = controls as CameraControls
    if (!animationMixer.current || !avatar.current || !cameraControls) return

    animationMixer.current.update(delta)
    avatar.current.update(delta)
    avatar.current.scene.rotation.y = MathUtils.degToRad(144)

    const head = avatar.current.humanoid!.getRawBoneNode('head')!
    cameraControls.normalizeRotations()

    if (Math.abs(cameraControls.azimuthAngle) < 1) {
      head.lookAt(camera.position)
      head.rotateY(MathUtils.degToRad(180))
      targetQuat.current = head.quaternion.clone()

      head.setRotationFromQuaternion(lastQuat.current)
      head.quaternion.slerp(targetQuat.current, delta * 3)
    } else if (neutralQuat.current) {
      head.setRotationFromQuaternion(lastQuat.current)
      head.quaternion.slerp(neutralQuat.current, delta * 3)
    }

    lastQuat.current = head.quaternion.clone()
  })

  return <primitive object={gltf.scene} {...props} />
}
