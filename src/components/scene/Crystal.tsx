import { useCallback, useMemo, useRef } from 'react'
import { useFrame, useThree, type ThreeEvent } from '@react-three/fiber'
import { Float, MeshTransmissionMaterial, Sparkles } from '@react-three/drei'
import { Color, type Group } from 'three'

const ROTATION_SPEED = (Math.PI * 2) / 50 // one full turn ~50s
const TILT_STRENGTH = 0.18
const TILT_LERP = 0.04
const DRAG_SENSITIVITY = 0.008
const MOMENTUM_DECAY = 0.94
const IDLE_RESUME_MS = 1200

export function Crystal() {
  const groupRef = useRef<Group>(null)
  const pointer = useThree((state) => state.pointer)
  // MeshTransmissionMaterial samples whatever is directly behind the mesh; without a
  // fallback it transmits straight through to the canvas's black clear color, which is
  // what made the crystal go solid black at some rotations. This gives it a floor color.
  const transmissionBackground = useMemo(() => new Color('#2b1c10'), [])
  const dragging = useRef(false)
  const last = useRef({ x: 0, y: 0 })
  const velocity = useRef({ x: 0, y: 0 })
  const lastInteraction = useRef(0)

  const handleMove = useCallback((e: PointerEvent) => {
    const group = groupRef.current
    if (!group) return
    const dx = e.clientX - last.current.x
    const dy = e.clientY - last.current.y
    group.rotation.y += dx * DRAG_SENSITIVITY
    group.rotation.x += dy * DRAG_SENSITIVITY
    velocity.current = { x: dx * DRAG_SENSITIVITY, y: dy * DRAG_SENSITIVITY }
    last.current = { x: e.clientX, y: e.clientY }
    lastInteraction.current = performance.now()
  }, [])

  const handleUp = useCallback(() => {
    dragging.current = false
    lastInteraction.current = performance.now()
    window.removeEventListener('pointermove', handleMove)
    window.removeEventListener('pointerup', handleUp)
  }, [handleMove])

  const onPointerDown = useCallback(
    (e: ThreeEvent<PointerEvent>) => {
      dragging.current = true
      last.current = { x: e.clientX, y: e.clientY }
      velocity.current = { x: 0, y: 0 }
      window.addEventListener('pointermove', handleMove)
      window.addEventListener('pointerup', handleUp)
    },
    [handleMove, handleUp],
  )

  useFrame((_, rawDelta) => {
    const group = groupRef.current
    if (!group || dragging.current) return

    // Backgrounded/inactive tabs throttle rAF, so the next delta after regaining focus
    // can be seconds long — clamp it so rotation doesn't jump wildly on return.
    const delta = Math.min(rawDelta, 1 / 30)

    velocity.current.x *= MOMENTUM_DECAY
    velocity.current.y *= MOMENTUM_DECAY

    const idle = performance.now() - lastInteraction.current > IDLE_RESUME_MS
    if (idle) {
      group.rotation.y += ROTATION_SPEED * delta
      const targetX = pointer.y * TILT_STRENGTH
      const targetZ = -pointer.x * TILT_STRENGTH
      group.rotation.x += (targetX - group.rotation.x) * TILT_LERP
      group.rotation.z += (targetZ - group.rotation.z) * TILT_LERP
    } else {
      group.rotation.y += velocity.current.x
      group.rotation.x += velocity.current.y
    }
  })

  return (
    <Float speed={1.4} rotationIntensity={0} floatIntensity={0.6} floatingRange={[-0.08, 0.08]}>
      <group ref={groupRef} onPointerDown={onPointerDown}>
        {/* inner glowing core, visible through the glass shell. A smooth sphere rather
            than a low-poly shape — flat facet gaps here read as dark voids through the
            transmissive shell, especially combined with the shell's own iridescence. */}
        <mesh scale={0.48}>
          <sphereGeometry args={[1, 24, 24]} />
          <meshBasicMaterial color="#d9a15c" transparent opacity={0.55} toneMapped={false} />
        </mesh>

        {/* outer faceted glass shell */}
        <mesh>
          <icosahedronGeometry args={[1, 0]} />
          <MeshTransmissionMaterial
            background={transmissionBackground}
            color="#f4ede0"
            thickness={1.1}
            roughness={0.06}
            transmission={0.88}
            ior={1.5}
            chromaticAberration={0.25}
            anisotropicBlur={0.1}
            distortion={0.08}
            distortionScale={0.3}
            clearcoat={1}
            clearcoatRoughness={0.1}
            iridescence={0.15}
            iridescenceIOR={1.3}
            iridescenceThicknessRange={[200, 380]}
            attenuationColor="#d9a15c"
            attenuationDistance={0.5}
            envMapIntensity={2.2}
            samples={6}
            resolution={512}
          />
        </mesh>

        {/* thin faceted wireframe cage for extra structure */}
        <mesh scale={1.015}>
          <icosahedronGeometry args={[1, 0]} />
          <meshBasicMaterial color="#f2ede2" wireframe transparent opacity={0.18} toneMapped={false} />
        </mesh>
      </group>

      <Sparkles count={40} scale={2.6} size={2.5} speed={0.2} color="#d9a15c" opacity={0.6} />
    </Float>
  )
}
