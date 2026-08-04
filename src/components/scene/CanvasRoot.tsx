import { Canvas } from '@react-three/fiber'
import { Environment, Lightformer } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette, Noise, ChromaticAberration } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import { Crystal } from './Crystal'

export function CanvasRoot() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4.2], fov: 32 }}
      gl={{ alpha: true, antialias: true }}
      dpr={[1, 2]}
    >
      {/* Post-processing (Vignette/Noise) can quietly opt the canvas out of transparency,
          which turns "invisible" background pixels into a visible rectangle where the
          canvas box meets the page. Giving the scene the page's own bg color means that
          edge is never visible even if the canvas stops being transparent. */}
      <color attach="background" args={['#0a0a0d']} />

      <ambientLight intensity={0.25} />
      <directionalLight position={[3, 2, 4]} intensity={2.4} color="#d9a15c" />
      <directionalLight position={[-4, -1, -2]} intensity={0.9} color="#7c6fa8" />

      <Crystal />

      {/* procedural environment — no network fetch, so the crystal never blocks on a remote HDR.
          Lightformers surround the crystal on every side so it always catches a highlight,
          no matter how it's been dragged — a single side-lit pair went fully dark on rotation. */}
      <Environment resolution={256} environmentIntensity={1.1}>
        <Lightformer
          form="rect"
          intensity={6}
          color="#d9a15c"
          scale={[4, 3, 1]}
          position={[3, 2, 2]}
          target={[0, 0, 0]}
        />
        <Lightformer
          form="rect"
          intensity={2.5}
          color="#7c6fa8"
          scale={[4, 4, 1]}
          position={[-4, -1, -2]}
          target={[0, 0, 0]}
        />
        <Lightformer
          form="circle"
          intensity={3}
          color="#f2ede2"
          scale={3}
          position={[0, 4.5, 1]}
          target={[0, 0, 0]}
        />
        <Lightformer
          form="circle"
          intensity={1.4}
          color="#d9a15c"
          scale={2.5}
          position={[0, -3.5, 2]}
          target={[0, 0, 0]}
        />
        <Lightformer
          form="rect"
          intensity={1.8}
          color="#f4ede0"
          scale={[3, 3, 1]}
          position={[0, 0, 5]}
          target={[0, 0, 0]}
        />
        <Lightformer
          form="ring"
          intensity={0.5}
          color="#7c6fa8"
          scale={10}
          position={[0, 0, -6]}
        />
      </Environment>

      <EffectComposer multisampling={0}>
        <Bloom
          intensity={0.5}
          luminanceThreshold={0.5}
          luminanceSmoothing={0.2}
          mipmapBlur
        />
        <ChromaticAberration offset={[0.0005, 0.0008]} radialModulation={false} modulationOffset={0} />
        <Noise premultiply blendFunction={BlendFunction.SOFT_LIGHT} opacity={0.1} />
        <Vignette eskil={false} offset={0.25} darkness={0.65} />
      </EffectComposer>
    </Canvas>
  )
}
