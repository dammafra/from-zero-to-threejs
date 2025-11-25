import { useDebug } from '@hooks'
import { GizmoHelper, GizmoViewport } from '@react-three/drei'
import { useControls } from 'leva'
import { Perf } from 'r3f-perf'

export function Helpers() {
  const debug = useDebug()

  const { grid, axes, gizmo } = useControls(
    'helpers',
    {
      grid: false,
      axes: false,
      gizmo: false,
    },
    { order: 3, collapsed: true },
  )

  return (
    <>
      {grid && <gridHelper args={[10, 10, 'red', 'gray']} />}
      {axes && <axesHelper args={[20]} position-y={0.001} />}

      {gizmo && (
        <GizmoHelper>
          <GizmoViewport labelColor="white" />
        </GizmoHelper>
      )}

      {debug && <Perf showGraph={false} position="top-right" />}
    </>
  )
}
