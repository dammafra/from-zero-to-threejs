import { Icon } from '@iconify/react'

export function PresentationControls() {
  const emulatePressKey = (code: string) => {
    dispatchEvent(new KeyboardEvent('keydown', { code }))
    setTimeout(() => dispatchEvent(new KeyboardEvent('keyup', { code })), 50)
  }

  return (
    <div className="controls">
      <button title="Reset camera" onClick={() => emulatePressKey('KeyR')}>
        <Icon icon="icon-park-twotone:radio-two" />
      </button>
      <button
        title="Start"
        onClick={() => {
          emulatePressKey('ShiftLeft')
          emulatePressKey('ArrowUp')
        }}
      >
        <Icon icon="icon-park-twotone:circle-double-left" />
      </button>
      <button title="Previous" onClick={() => emulatePressKey('ArrowUp')}>
        <Icon icon="icon-park-twotone:left-c" />
      </button>
      <button title="Next" onClick={() => emulatePressKey('ArrowDown')}>
        <Icon icon="icon-park-twotone:right-c" />
      </button>
      <button
        title="End"
        onClick={() => {
          emulatePressKey('ShiftLeft')
          emulatePressKey('ArrowDown')
        }}
      >
        <Icon icon="icon-park-twotone:circle-double-right" />
      </button>
    </div>
  )
}
