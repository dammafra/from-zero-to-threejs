import { useEffect } from 'react'
import { useParams, useSearchParams } from 'wouter'

export function Example() {
  const params = useParams()
  const name = params.name!

  const [search] = useSearchParams()
  const embed = search.has('embed')

  const locations: Record<string, string> = {
    bruno: 'https://bruno-simon.com',
  }

  useEffect(() => {
    if (!embed) window.location.replace(locations[name])
  }, [embed])

  return embed && <img src={`/images/${name}.png`} className="fixed top-0 size-full object-cover" />
}
