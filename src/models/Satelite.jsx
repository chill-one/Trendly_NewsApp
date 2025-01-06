import React from 'react'
import { useRef, useEffect } from 'react'
import sateliteScene from '../assets/3d/dawn.glb'
import { useGLTF } from '@react-three/drei'
import { use } from 'react'
import { useFrame } from '@react-three/fiber'

const satelite = () => {
  const { scene } = useGLTF(sateliteScene)
  const satelliteRef = useRef()

  // Define the orbit center
  const orbitCenter = [0, -6.5, -43];
  const orbitRadius = 25; // Distance from the center
  const orbitSpeed = .2; // Speed of the orbit

  useFrame((state, delta) => {
    if (satelliteRef.current) {
      const time = state.clock.elapsedTime * orbitSpeed;

      // Circular orbit logic
      satelliteRef.current.position.x = orbitCenter[0] + Math.sin(time) * orbitRadius;
      satelliteRef.current.position.z = orbitCenter[2] + Math.cos(time) * orbitRadius;

      // Oscillating movement on the Y-axis
      satelliteRef.current.position.y = orbitCenter[1] + Math.sin(time * 2) * 2;

      // Satellite Rotation
      satelliteRef.current.rotation.y += 0.1 * delta;
    }
  });

  return (
    <mesh>
        <primitive 
            object={scene}
            position={[0, 0, 0]}
            scale={[0.1, 0.1, 0.1]}
            ref={satelliteRef}
        />
    </mesh>
  )
}

export default satelite