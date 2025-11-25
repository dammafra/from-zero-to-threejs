import { Icon } from '@iconify/react'

export function PresentationControls() {
  const emulatePressKey = (key: string) => {
    dispatchEvent(new KeyboardEvent('keydown', { key }))
    setTimeout(() => dispatchEvent(new KeyboardEvent('keyup', { key })))
  }

  return (
    <div className="absolute bottom-4 right-4 lex gap-2 text-5xl text-white z-[99999999]">
      <button
        title="Re-center"
        onClick={() => emulatePressKey('KeyR')}
        className="cursor-pointer opacity-10 hover:opacity-100 transition-[opacity]"
      >
        <Icon icon="icon-park-twotone:radio-two" />
      </button>
      <button
        title="Previous"
        onClick={() => emulatePressKey('ArrowUp')}
        className="cursor-pointer opacity-10 hover:opacity-100 transition-[opacity]"
      >
        <Icon icon="icon-park-twotone:left-c" />
      </button>
      <button
        title="Next"
        onClick={() => emulatePressKey('ArrowDown')}
        className="cursor-pointer opacity-10 hover:opacity-100 transition-[opacity]"
      >
        <Icon icon="icon-park-twotone:right-c" />
      </button>
    </div>
  )
}
