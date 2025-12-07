import { create } from 'zustand'

type CamerasStore = {
  orthographic: boolean
  setOrthographic: (value: boolean) => void
}

export const useCameras = create<CamerasStore>()(set => ({
  orthographic: false,
  setOrthographic: value => set({ orthographic: value }),
}))
