import { useDebug } from '@hooks'
import { GizmoHelper, GizmoViewport } from '@react-three/drei'
import { useControls } from 'leva'
import { PerfMonitor } from 'r3f-monitor'

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

      {debug && <PerfMonitor showGraph={false} displayType="classic" position="top-right" />}
    </>
  )
}
