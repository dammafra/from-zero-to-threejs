import type { EulerTuple, Vector3Tuple } from 'three'
import { create } from 'zustand'

interface LogoStore {
  position: Vector3Tuple
  rotation: EulerTuple
  scale: number
  visible: boolean
}

type OverlayStore = {
  logo: LogoStore
  setLogo: (params: Partial<LogoStore>) => void
}

export const useOverlay = create<OverlayStore>()(set => ({
  logo: { visible: true, position: [0, 0, 0], rotation: [0, 0, 0], scale: 1 },
  setLogo: params => {
    set(state => {
      // console.log(params)
      return { logo: { ...state.logo, ...params } }
    })
  },
}))
