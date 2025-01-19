import { Canvas } from '@react-three/fiber';
import { Environment, Float, PerspectiveCamera } from '@react-three/drei';
import { Suspense } from 'react';
import ProjectGeometry from './ProjectGeometry';

export default function Scene() {
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10">
      <Canvas>
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 0, 5]} />
          <Float
            speed={4}
            rotationIntensity={1}
            floatIntensity={2}
          >
            <ProjectGeometry />
          </Float>
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
}