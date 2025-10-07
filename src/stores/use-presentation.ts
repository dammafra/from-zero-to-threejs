import { create } from 'zustand'

type PresentationStore = {
  slidesCount: number
  setSlidesCount: (n: number) => void

  activeIndex: number
  reset: (index?: number) => void
  next: () => void
  previous: () => void
}

const usePresentation = create<PresentationStore>()(set => ({
  slidesCount: 0,
  setSlidesCount: (slidesCount: number) => set({ slidesCount }),

  activeIndex: 0,
  reset: (index?: number) => {
    set(state => {
      const activeIndex = typeof index !== 'undefined' ? index : state.activeIndex
      setTimeout(() => set({ activeIndex }), 100)
      return { activeIndex: -1 }
    })
  },
  next: () => set(state => ({ activeIndex: Math.min(state.activeIndex + 1, state.slidesCount - 1) })), //prettier-ignore
  previous: () => set(state => ({ activeIndex: Math.max(state.activeIndex - 1, 0) })),
}))

export default usePresentation
