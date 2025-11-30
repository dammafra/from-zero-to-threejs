import { create } from 'zustand'

type EnvironemntStore = {
  lights: boolean
  setLights: (value: boolean) => void
}

export const useEnvironment = create<EnvironemntStore>()(set => ({
  lights: true,
  setLights: value => set({ lights: value }),

  orthographic: true,
}))
