import { Icon } from '@iconify/react'
import usePresentation from '@stores/use-presentation'
import { useShallow } from 'zustand/shallow'

export default function PresentationControls() {
  const handlers = usePresentation(
    useShallow(state => ({
      reset: state.reset,
      next: state.next,
      previous: state.previous,
    })),
  )

  return (
    <div className="absolute bottom-4 right-4 lex gap-2 text-5xl text-white z-[99999999]">
      <button
        title="Re-center"
        onClick={() => handlers.reset()}
        className="cursor-pointer opacity-10 hover:opacity-100 transition-[opacity]"
      >
        <Icon icon="icon-park-twotone:radio-two" />
      </button>
      <button
        title="Previous"
        onClick={() => handlers.previous()}
        className="cursor-pointer opacity-10 hover:opacity-100 transition-[opacity]"
      >
        <Icon icon="icon-park-twotone:left-c" />
      </button>
      <button
        title="Next"
        onClick={() => handlers.next()}
        className="cursor-pointer opacity-10 hover:opacity-100 transition-[opacity]"
      >
        <Icon icon="icon-park-twotone:right-c" />
      </button>
    </div>
  )
}
