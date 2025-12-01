import type { VRM, VRMHumanBoneName } from '@pixiv/three-vrm'
import { useEffect, useState } from 'react'
import {
  AnimationClip,
  Group,
  Quaternion,
  QuaternionKeyframeTrack,
  VectorKeyframeTrack,
  type Object3DEventMap,
} from 'three'
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js'

const mixamoVRMRigMap: Record<string, VRMHumanBoneName> = {
  mixamorigHips: 'hips',
  mixamorigSpine: 'spine',
  mixamorigSpine1: 'chest',
  mixamorigSpine2: 'upperChest',
  mixamorigNeck: 'neck',
  mixamorigHead: 'head',
  mixamorigLeftShoulder: 'leftShoulder',
  mixamorigLeftArm: 'leftUpperArm',
  mixamorigLeftForeArm: 'leftLowerArm',
  mixamorigLeftHand: 'leftHand',
  mixamorigLeftHandThumb1: 'leftThumbMetacarpal',
  mixamorigLeftHandThumb2: 'leftThumbProximal',
  mixamorigLeftHandThumb3: 'leftThumbDistal',
  mixamorigLeftHandIndex1: 'leftIndexProximal',
  mixamorigLeftHandIndex2: 'leftIndexIntermediate',
  mixamorigLeftHandIndex3: 'leftIndexDistal',
  mixamorigLeftHandMiddle1: 'leftMiddleProximal',
  mixamorigLeftHandMiddle2: 'leftMiddleIntermediate',
  mixamorigLeftHandMiddle3: 'leftMiddleDistal',
  mixamorigLeftHandRing1: 'leftRingProximal',
  mixamorigLeftHandRing2: 'leftRingIntermediate',
  mixamorigLeftHandRing3: 'leftRingDistal',
  mixamorigLeftHandPinky1: 'leftLittleProximal',
  mixamorigLeftHandPinky2: 'leftLittleIntermediate',
  mixamorigLeftHandPinky3: 'leftLittleDistal',
  mixamorigRightShoulder: 'rightShoulder',
  mixamorigRightArm: 'rightUpperArm',
  mixamorigRightForeArm: 'rightLowerArm',
  mixamorigRightHand: 'rightHand',
  mixamorigRightHandPinky1: 'rightLittleProximal',
  mixamorigRightHandPinky2: 'rightLittleIntermediate',
  mixamorigRightHandPinky3: 'rightLittleDistal',
  mixamorigRightHandRing1: 'rightRingProximal',
  mixamorigRightHandRing2: 'rightRingIntermediate',
  mixamorigRightHandRing3: 'rightRingDistal',
  mixamorigRightHandMiddle1: 'rightMiddleProximal',
  mixamorigRightHandMiddle2: 'rightMiddleIntermediate',
  mixamorigRightHandMiddle3: 'rightMiddleDistal',
  mixamorigRightHandIndex1: 'rightIndexProximal',
  mixamorigRightHandIndex2: 'rightIndexIntermediate',
  mixamorigRightHandIndex3: 'rightIndexDistal',
  mixamorigRightHandThumb1: 'rightThumbMetacarpal',
  mixamorigRightHandThumb2: 'rightThumbProximal',
  mixamorigRightHandThumb3: 'rightThumbDistal',
  mixamorigLeftUpLeg: 'leftUpperLeg',
  mixamorigLeftLeg: 'leftLowerLeg',
  mixamorigLeftFoot: 'leftFoot',
  mixamorigLeftToeBase: 'leftToes',
  mixamorigRightUpLeg: 'rightUpperLeg',
  mixamorigRightLeg: 'rightLowerLeg',
  mixamorigRightFoot: 'rightFoot',
  mixamorigRightToeBase: 'rightToes',
}

const loader = new FBXLoader()
const rawClipsCache = new Map<string, Group<Object3DEventMap>>()
const vrmClipsCache = new WeakMap<VRM, Map<string, AnimationClip>>()

export function useMixamoAnimation(url: string | null, vrm: VRM | null) {
  const [clip, setClip] = useState<AnimationClip | null>(null)

  useEffect(() => {
    if (!url || !vrm) return

    const process = (asset: Group<Object3DEventMap>) => {
      const baseClip = AnimationClip.findByName(asset.animations, 'mixamo.com')
      if (!baseClip) return

      const tracks: (QuaternionKeyframeTrack | VectorKeyframeTrack)[] = []
      const restRotationInverse = new Quaternion()
      const parentRestWorldRotation = new Quaternion()
      const _quatA = new Quaternion()

      const motionHipsHeight = asset.getObjectByName('mixamorigHips')?.position.y ?? 1
      const vrmHipsHeight = vrm.humanoid.normalizedRestPose.hips?.position?.[1] ?? 1
      const hipsPositionScale = vrmHipsHeight / motionHipsHeight

      baseClip.tracks.forEach(track => {
        const [mixamoRigName, propertyName] = track.name.split('.')
        const vrmBoneName = mixamoVRMRigMap[mixamoRigName] // assume imported elsewhere
        const vrmNodeName = vrm.humanoid?.getNormalizedBoneNode(vrmBoneName)?.name
        const mixamoRigNode = asset.getObjectByName(mixamoRigName)

        if (!vrmNodeName || !mixamoRigNode) return

        mixamoRigNode.getWorldQuaternion(restRotationInverse).invert()
        mixamoRigNode.parent?.getWorldQuaternion(parentRestWorldRotation)

        if (track instanceof QuaternionKeyframeTrack) {
          for (let i = 0; i < track.values.length; i += 4) {
            const flatQuat = track.values.slice(i, i + 4)
            _quatA.fromArray(flatQuat)
            _quatA.premultiply(parentRestWorldRotation).multiply(restRotationInverse)
            _quatA.toArray(flatQuat)
            flatQuat.forEach((v, idx) => (track.values[i + idx] = v))
          }
          tracks.push(
            new QuaternionKeyframeTrack(
              `${vrmNodeName}.${propertyName}`,
              track.times,
              track.values.map((v, i) => (vrm.meta?.metaVersion === '0' && i % 2 === 0 ? -v : v)),
            ),
          )
        } else if (track instanceof VectorKeyframeTrack) {
          const value = track.values.map(
            (v, i) => (vrm.meta?.metaVersion === '0' && i % 3 !== 1 ? -v : v) * hipsPositionScale,
          )
          tracks.push(new VectorKeyframeTrack(`${vrmNodeName}.${propertyName}`, track.times, value))
        }
      })

      const vrmClip = new AnimationClip('vrmAnimation', baseClip.duration, tracks)
      vrmCache!.set(url, vrmClip)
      setClip(vrmClip)
    }

    let vrmCache = vrmClipsCache.get(vrm)
    if (!vrmCache) {
      vrmCache = new Map()
      vrmClipsCache.set(vrm, vrmCache)
    }

    if (vrmCache.has(url)) {
      setClip(vrmCache.get(url)!)
      return
    }

    if (rawClipsCache.has(url)) {
      process(rawClipsCache.get(url)!)
    } else {
      loader.loadAsync(url).then(asset => {
        rawClipsCache.set(url, asset)
        process(asset)
      })
    }
  }, [url, vrm])

  return clip
}

useMixamoAnimation.preload = (url: string) => {
  if (!url || rawClipsCache.has(url)) return
  loader.loadAsync(url).then(asset => rawClipsCache.set(url, asset))
}
