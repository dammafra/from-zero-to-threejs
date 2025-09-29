import type { VRM, VRMHumanBoneName } from '@pixiv/three-vrm'
import { useEffect, useState } from 'react'
import * as THREE from 'three'
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

export function useMixamoAnimation(url: string | null, vrm: VRM | null) {
  const [clip, setClip] = useState<THREE.AnimationClip | null>(null)

  useEffect(() => {
    if (!url || !vrm) return

    const loader = new FBXLoader()
    loader.loadAsync(url).then(asset => {
      const baseClip = THREE.AnimationClip.findByName(asset.animations, 'mixamo.com')
      if (!baseClip) return

      const tracks: (THREE.QuaternionKeyframeTrack | THREE.VectorKeyframeTrack)[] = []
      const restRotationInverse = new THREE.Quaternion()
      const parentRestWorldRotation = new THREE.Quaternion()
      const _quatA = new THREE.Quaternion()

      const motionHipsHeight = asset.getObjectByName('mixamorigHips')?.position.y ?? 1
      const vrmHipsHeight = vrm.humanoid.normalizedRestPose.hips?.position?.[1] ?? 1
      const hipsPositionScale = vrmHipsHeight / motionHipsHeight

      baseClip.tracks.forEach(track => {
        const [mixamoRigName, propertyName] = track.name.split('.')
        const vrmBoneName = mixamoVRMRigMap[mixamoRigName]
        const vrmNodeName = vrm.humanoid?.getNormalizedBoneNode(vrmBoneName)?.name
        const mixamoRigNode = asset.getObjectByName(mixamoRigName)

        if (vrmNodeName && mixamoRigNode) {
          mixamoRigNode.getWorldQuaternion(restRotationInverse).invert()
          mixamoRigNode.parent?.getWorldQuaternion(parentRestWorldRotation)

          if (track instanceof THREE.QuaternionKeyframeTrack) {
            for (let i = 0; i < track.values.length; i += 4) {
              const flatQuaternion = track.values.slice(i, i + 4)
              _quatA.fromArray(flatQuaternion)
              _quatA.premultiply(parentRestWorldRotation).multiply(restRotationInverse)
              _quatA.toArray(flatQuaternion)
              flatQuaternion.forEach((v, index) => {
                track.values[index + i] = v
              })
            }

            tracks.push(
              new THREE.QuaternionKeyframeTrack(
                `${vrmNodeName}.${propertyName}`,
                track.times,
                track.values.map((v, i) => (vrm.meta?.metaVersion === '0' && i % 2 === 0 ? -v : v)),
              ),
            )
          } else if (track instanceof THREE.VectorKeyframeTrack) {
            const value = track.values.map(
              (v, i) => (vrm.meta?.metaVersion === '0' && i % 3 !== 1 ? -v : v) * hipsPositionScale,
            )
            tracks.push(
              new THREE.VectorKeyframeTrack(`${vrmNodeName}.${propertyName}`, track.times, value),
            )
          }
        }
      })

      setClip(new THREE.AnimationClip('vrmAnimation', baseClip.duration, tracks))
    })
  }, [url, vrm])

  return clip
}
