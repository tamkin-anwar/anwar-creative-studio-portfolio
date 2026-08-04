import { Canvas } from '@react-three/fiber'
import { Sparkles } from '@react-three/drei'

export function AmbientField() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-50" aria-hidden>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        gl={{ alpha: true, antialias: false }}
        dpr={[1, 1.5]}
      >
        <Sparkles count={100} scale={[16, 10, 8]} size={1.4} speed={0.1} color="#d9a15c" opacity={0.35} />
        <Sparkles count={70} scale={[16, 10, 8]} size={1.1} speed={0.06} color="#7c6fa8" opacity={0.28} />
      </Canvas>
    </div>
  )
}
