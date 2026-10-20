import { Icon } from '@iconify/react'
import { a, useSpring } from '@react-spring/web'
import { type ComponentPropsWithoutRef, useState } from 'react'

type FrameLoader<T extends 'img' | 'iframe'> = {
  as?: T
  src?: string
} & ComponentPropsWithoutRef<T>

export function FrameLoader<T extends 'img' | 'iframe' = 'img'>({
  as,
  src,
  ...props
}: FrameLoader<T>) {
  const [loaded, setLoaded] = useState(false)
  const Component = a[as || 'img']

  const springs = useSpring({ opacity: loaded ? 1 : 0 })

  return (
    <div className="fixed inset-0">
      {!loaded && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-100">
          <Icon icon="eos-icons:three-dots-loading" className="text-[20rem] text-gray-500" />
        </div>
      )}
      {/* @ts-expect-error spring typings */}
      <Component
        src={src}
        {...props}
        className={`${loaded ? 'block' : 'hidden'} ${props.className || ''}`}
        onLoad={() => setLoaded(true)}
        style={springs}
      />
    </div>
  )
}
