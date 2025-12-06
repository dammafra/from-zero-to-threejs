import { useMixamoAnimation } from '@hooks'
import { VRM, VRMLoaderPlugin, VRMUtils } from '@pixiv/three-vrm'
import { CameraControls, useGLTF } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useRef, type JSX } from 'react'
import { AnimationMixer, LoopRepeat, MathUtils, Mesh, Quaternion } from 'three'

export function Avatar(props: JSX.IntrinsicElements['mesh']) {
  const gltf = useGLTF('/models/avatar.vrm')

  const walkClip = useMixamoAnimation('/models/walking.fbx', gltf.userData.vrm)
  const waveClip = useMixamoAnimation('/models/waving.fbx', gltf.userData.vrm)

  const { controls } = useThree()
  const avatar = useRef<VRM>(null)
  const animationMixer = useRef<AnimationMixer>(null)

  const headTracking = useRef(false)
  const lastQuat = useRef<Quaternion>(new Quaternion(0, 0, 0, 1))
  const targetQuat = useRef<Quaternion>(null!)

  useEffect(() => {
    if (!gltf) return

    gltf.scene.traverse(child => {
      child.castShadow = child instanceof Mesh && child.isMesh
    })

    const vrm = gltf.userData.vrm
    VRMUtils.removeUnnecessaryVertices(gltf.scene)
    VRMUtils.combineSkeletons(gltf.scene)
    VRMUtils.combineMorphs(vrm)
    VRMUtils.rotateVRM0(vrm)
    avatar.current = vrm
  }, [gltf])

  useEffect(() => {
    if (!avatar.current || !walkClip || !waveClip) return

    const mixer = new AnimationMixer(avatar.current.scene)
    animationMixer.current = mixer

    const walk = mixer.clipAction(walkClip)
    const wave = mixer.clipAction(waveClip)

    walk.clampWhenFinished = true
    walk.setLoop(LoopRepeat, 3).play()

    const onFinished = () => {
      headTracking.current = true
      walk.fadeOut(0.25)
      wave.fadeIn(0.25).play()
    }

    mixer.addEventListener('finished', onFinished)
    return () => {
      mixer.removeEventListener('finished', onFinished)
      mixer.stopAllAction()
    }
  }, [walkClip, waveClip, gltf])

  useFrame((_, delta) => {
    const cameraControls = controls as CameraControls
    if (!animationMixer.current || !avatar.current || !cameraControls) return

    animationMixer.current.update(delta)
    avatar.current.update(delta)

    const head = avatar.current.humanoid!.getRawBoneNode('head')!
    cameraControls.normalizeRotations()

    if (!headTracking.current) return

    const azimuthAngle = Math.abs(Math.round(MathUtils.radToDeg(cameraControls.azimuthAngle)))
    const polarAngle = Math.abs(Math.round(MathUtils.radToDeg(cameraControls.polarAngle)))

    if (azimuthAngle < 70 && polarAngle > 10) {
      head.lookAt(cameraControls.camera.position)
      head.rotateY(MathUtils.degToRad(180))
      targetQuat.current = head.quaternion.clone()

      head.setRotationFromQuaternion(lastQuat.current)
      head.quaternion.slerp(targetQuat.current, delta * 3)
    } else {
      head.setRotationFromQuaternion(lastQuat.current)
      head.quaternion.slerp(new Quaternion(0, 0, 0, 1), delta * 3)
    }

    lastQuat.current = head.quaternion.clone()
  })

  return <primitive object={gltf.scene} {...props} />
}

// @ts-expect-error GLTFLoaderPlugin version mismatch
useGLTF.preload('/models/avatar.vrm', true, true, loader => loader.register(parser => new VRMLoaderPlugin(parser, { autoUpdateHumanBones: true }))) //prettier-ignore
useMixamoAnimation.preload('/models/walking.fbx')
useMixamoAnimation.preload('/models/waving.fbx')
