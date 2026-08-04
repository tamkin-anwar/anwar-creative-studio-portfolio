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
      <ambientLight intensity={0.15} />
      <directionalLight position={[3, 2, 4]} intensity={3} color="#d9a15c" />
      <directionalLight position={[-4, -1, -2]} intensity={0.6} color="#7c6fa8" />

      <Crystal />

      {/* procedural environment — no network fetch, so the crystal never blocks on a remote HDR */}
      <Environment resolution={256}>
        <Lightformer
          form="rect"
          intensity={5}
          color="#d9a15c"
          scale={[4, 3, 1]}
          position={[3, 2, 2]}
          target={[0, 0, 0]}
        />
        <Lightformer
          form="rect"
          intensity={1.8}
          color="#7c6fa8"
          scale={[4, 4, 1]}
          position={[-4, -1, -2]}
          target={[0, 0, 0]}
        />
        <Lightformer
          form="ring"
          intensity={0.4}
          color="#f2ede2"
          scale={10}
          position={[0, 0, -6]}
        />
      </Environment>

      <EffectComposer multisampling={0}>
        <Bloom
          intensity={0.55}
          luminanceThreshold={0.55}
          luminanceSmoothing={0.2}
          mipmapBlur
        />
        <ChromaticAberration offset={[0.0008, 0.0012]} radialModulation={false} modulationOffset={0} />
        <Noise premultiply blendFunction={BlendFunction.SOFT_LIGHT} opacity={0.12} />
        <Vignette eskil={false} offset={0.25} darkness={0.7} />
      </EffectComposer>
    </Canvas>
  )
}
