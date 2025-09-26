export default function useDebug() {
  return (
    import.meta.env.MODE === 'development' ||
    (typeof window !== 'undefined' && location.hash === '#debug')
  )
}
