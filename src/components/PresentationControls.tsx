import { Icon } from '@iconify/react'

export function PresentationControls() {
  const emulatePressKey = (key: string) => {
    dispatchEvent(new KeyboardEvent('keydown', { key }))
    setTimeout(() => dispatchEvent(new KeyboardEvent('keyup', { key })))
  }

  return (
    <div className="controls">
      <button title="Home" onClick={() => emulatePressKey('KeyH')}>
        <Icon icon="icon-park-twotone:circle-double-left" />
      </button>
      <button title="Reset" onClick={() => emulatePressKey('KeyR')}>
        <Icon icon="icon-park-twotone:radio-two" />
      </button>
      <button title="Previous" onClick={() => emulatePressKey('ArrowUp')}>
        <Icon icon="icon-park-twotone:left-c" />
      </button>
      <button title="Next" onClick={() => emulatePressKey('ArrowDown')}>
        <Icon icon="icon-park-twotone:right-c" />
      </button>
    </div>
  )
}
