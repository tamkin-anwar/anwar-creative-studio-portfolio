import { useCallback, useMemo, useRef, type MutableRefObject } from 'react'
import { useFrame, type ThreeEvent } from '@react-three/fiber'
import { MarchingCubes, MarchingCube } from '@react-three/drei'
import { DoubleSide, type Group } from 'three'

const BLOB_COUNT = 4
const DRAG_SENSITIVITY = 0.0025
const SHAKE_DECAY = 0.94

type BlobConfig = {
  freqX: number
  freqY: number
  freqZ: number
  phaseX: number
  phaseY: number
  phaseZ: number
  radius: number
  weight: number
}

// Angular frequency in rad/s — a blob with freq 0.2 completes a cycle in
// ~2π/0.2 ≈ 31s. (An earlier version multiplied a second "speed" factor into
// this, so cycles ran at ~75s and the blobs read as nearly frozen.)
function makeBlobConfigs(): BlobConfig[] {
  return Array.from({ length: BLOB_COUNT }, () => ({
    freqX: 0.16 + Math.random() * 0.1,
    freqY: 0.09 + Math.random() * 0.07,
    freqZ: 0.14 + Math.random() * 0.09,
    phaseX: Math.random() * Math.PI * 2,
    phaseY: Math.random() * Math.PI * 2,
    phaseZ: Math.random() * Math.PI * 2,
    radius: 0.26 + Math.random() * 0.18,
    weight: 0.6 + Math.random() * 0.8,
  }))
}

function Blob({
  config,
  shake,
}: {
  config: BlobConfig
  shake: MutableRefObject<{ x: number; y: number }>
}) {
  const ref = useRef<Group>(null)

  useFrame((state) => {
    const g = ref.current
    if (!g) return
    const t = state.clock.elapsedTime

    const x = Math.sin(t * config.freqX + config.phaseX) * 0.42 + shake.current.x * config.weight
    const y = Math.sin(t * config.freqY + config.phaseY) * 0.55
    const z = Math.cos(t * config.freqZ + config.phaseZ) * 0.38 + shake.current.y * config.weight

    g.position.set(x, y, z)
  })

  return <MarchingCube ref={ref} strength={config.radius} subtract={7} />
}

export function LavaLamp() {
  const configs = useMemo(() => makeBlobConfigs(), [])
  const shake = useRef({ x: 0, y: 0 })
  const last = useRef({ x: 0, y: 0 })

  useFrame(() => {
    shake.current.x *= SHAKE_DECAY
    shake.current.y *= SHAKE_DECAY
  })

  const handleMove = useCallback((e: PointerEvent) => {
    shake.current.x += (e.clientX - last.current.x) * DRAG_SENSITIVITY
    shake.current.y += (e.clientY - last.current.y) * DRAG_SENSITIVITY
    last.current = { x: e.clientX, y: e.clientY }
  }, [])

  const handleUp = useCallback(() => {
    window.removeEventListener('pointermove', handleMove)
    window.removeEventListener('pointerup', handleUp)
  }, [handleMove])

  const onPointerDown = useCallback(
    (e: ThreeEvent<PointerEvent>) => {
      last.current = { x: e.clientX, y: e.clientY }
      window.addEventListener('pointermove', handleMove)
      window.addEventListener('pointerup', handleUp)
    },
    [handleMove, handleUp],
  )

  return (
    <group onPointerDown={onPointerDown}>
      {/* outer glass tube — reads as the lamp's silhouette around the blobs.
          Plain alpha transparency rather than physical transmission: real
          transmission adds a whole extra scene render pass every frame, and
          with the marching-cubes field already re-evaluating on every frame
          below, that combination was heavy enough to stall the main thread
          (the preloader itself, running on the same thread, visibly lagged). */}
      <mesh>
        <cylinderGeometry args={[0.62, 0.56, 1.95, 24, 1, true]} />
        <meshPhysicalMaterial
          color="#f4ede0"
          roughness={0.1}
          transparent
          opacity={0.14}
          side={DoubleSide}
          envMapIntensity={1}
        />
      </mesh>

      {/* the wax — plain meshPhysicalMaterial transmission rather than drei's
          MeshTransmissionMaterial. That material's userland FBO-based background
          sampling was the root of two separate rendering bugs on the previous
          crystal (going solid black, and an iridescence artifact). Native
          transmission is renderer-managed and has been reliable in testing.
          Resolution kept moderate — marching cubes re-polygonizes every frame
          since the blobs are always moving, and that CPU cost (not the material)
          was the actual bottleneck; too low and the blobs look faceted instead
          of round. 26 was the balance that stayed smooth without stalling. */}
      <MarchingCubes resolution={22} maxPolyCount={7000} scale={[0.8, 1.3, 0.8]}>
        <meshPhysicalMaterial
          color="#f4ede0"
          roughness={0.08}
          transmission={0.85}
          thickness={0.5}
          ior={1.45}
          clearcoat={0.6}
          clearcoatRoughness={0.15}
          attenuationColor="#d9a15c"
          attenuationDistance={1.3}
          envMapIntensity={2.2}
        />
        {configs.map((config, i) => (
          <Blob key={i} config={config} shake={shake} />
        ))}
      </MarchingCubes>
    </group>
  )
}
