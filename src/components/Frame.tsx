import { Billboard, Float, Html, RoundedBoxGeometry, type BillboardProps } from '@react-three/drei'
import { useLocation } from 'wouter'

interface FrameProps extends BillboardProps {
  src?: string
}

export function Frame({ src, ...props }: FrameProps) {
  const [, navigate] = useLocation()

  return (
    <Billboard {...props} onDoubleClick={() => navigate(`~${src}`)}>
      <Float>
        <mesh scale={0.05} position={[-1.25, 1.25, 0]}>
          <circleGeometry />
          <meshBasicMaterial color="red" />
        </mesh>
        <mesh scale={0.05} position={[-1.1, 1.25, 0]}>
          <circleGeometry />
          <meshBasicMaterial color="orange" />
        </mesh>
        <mesh scale={0.05} position={[-0.95, 1.25, 0]}>
          <circleGeometry />
          <meshBasicMaterial color="green" />
        </mesh>
        <mesh castShadow position={[0, 0, -0.06]} scale={[2.8, 2.8, 0.1]}>
          <RoundedBoxGeometry />
          <meshStandardMaterial />
        </mesh>
        <Html transform occlude position-y={-0.05} scale={0.1}>
          <iframe width={1000} height={950} className="rounded-4xl bg-black" src={src} />
        </Html>
      </Float>
    </Billboard>
  )
}
