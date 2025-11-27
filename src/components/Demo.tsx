import { Icon } from '@iconify/react'
import { a, useSpring } from '@react-spring/web'
import { useState } from 'react'
import { useParams } from 'wouter'

export function Demo() {
  const params = useParams()
  const src = decodeURIComponent(params.src!)
  const [loaded, setLoaded] = useState(false)

  const springs = useSpring({ opacity: loaded ? 1 : 0 })

  return (
    <div className="controls size-fit top-4 left-4">
      <button title="Back" onClick={() => history.back()} className="z-10">
        <Icon icon="icon-park-twotone:left-c" />
      </button>

      <a.iframe
        src={src}
        onLoad={() => setLoaded(true)}
        className="fixed inset-0 h-full w-full"
        style={springs}
      />
    </div>
  )
}
