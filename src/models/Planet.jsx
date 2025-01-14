/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Author: Shubhanshu Soni (https://sketchfab.com/sonishubhanshu99)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/earth-37249acae18b406d8c1c160d7c0bc8e6
Title: Earth
*/

import React, { useRef, useEffect} from 'react'
import { useFrame, useThree} from '@react-three/fiber'
import { useGLTF, useAnimations } from '@react-three/drei'
import { a } from '@react-spring/three'

import planet from '../assets/3d/earth.glb'


const Planet = ({ isRotating, setIsRotating, setCurrentStage, ...props}) => {
  const group = useRef()
  const earthRef = useRef()
  const { gl, viewport }  = useThree()
  const { nodes, materials, animations } = useGLTF(planet)
  const { actions } = useAnimations(animations, group)

  const lastX = useRef(0);
  const rotationSpeed = useRef(0);
  const dampingFactor = 0.95;

  const handlePointerDown = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setIsRotating(true);

    const clientX = event.touches ? event.touches[0].clientX : event.clientX;
    lastX.current = clientX;
  }

  const handlePointerUp = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setIsRotating(false);


  }

  const handlePointerMove = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if(isRotating){
      const clientX = event.touches 
      ? event.touches[0].clientX 
      : event.clientX;
  
      const delta = (clientX - lastX.current) / viewport.width;
  
      group.current.rotation.y += delta * Math.PI * 0.01;
      lastX.current = clientX;
      rotationSpeed.current = delta * 0.01 * Math.PI;
    }
  }

  const handleKeyDown = (e) => {
    if(e.key === 'ArrowLeft') {
      if(!isRotating) setIsRotating(true);

      group.current.rotation.y += 0.005 * Math.PI;
      rotationSpeed.current = 0.007;
    }else if(e.key === 'ArrowRight'){
      if(!isRotating) setIsRotating(true);

      group.current.rotation.y -= 0.01 * Math.PI;
      rotationSpeed.current = -0.007;
    }
  }

  const handleKeyUp = (e) => {
    if(e.key === 'ArrowLeft' || e.key === 'ArrowRight'){
      setIsRotating(false);
    }
  }


  useEffect(() => {
    if(actions){
      Object.values(actions).forEach((action) => {
        action.play()
      })}

      const canvas = gl.domElement;
      canvas.addEventListener('pointerdown', handlePointerDown);
      canvas.addEventListener('pointermove', handlePointerMove);
      canvas.addEventListener('pointerup', handlePointerUp);
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('keyup', handleKeyUp);

      return () => {
        canvas.removeEventListener('pointerdown', handlePointerDown);
        canvas.removeEventListener('pointermove', handlePointerMove);
        canvas.removeEventListener('pointerup', handlePointerUp);
        document.removeEventListener('keydown', handleKeyDown);
        document.removeEventListener('keyup', handleKeyUp);
      }
    }, [actions, gl, handlePointerDown, handlePointerMove, handlePointerUp])

    
  useFrame((state, delta) => {
    if (earthRef.current) {
      earthRef.current.rotation.x = (23.5 * Math.PI) / 180

      // Rotate around Y-axis (primary rotation axis)
      earthRef.current.rotation.y += 0.05 * delta // Adjust for realistic speed

      // Minor Z-axis wobble (precession effect)
      earthRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.1) * 0.02

    }

    if(!isRotating){
      rotationSpeed.current *= dampingFactor;
      if(Math.abs(rotationSpeed.current) < 0.0001){
        rotationSpeed.current = 0;
      }
      group.current.rotation.y += rotationSpeed.current;
    }else{
      const rotation = group.current.rotation.y;
      const normalizedRotation =
      ((rotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);

    // Set the current stage based on the island's orientation
    switch (true) {
      case normalizedRotation >= 5.45 && normalizedRotation <= 5.85:
        setCurrentStage(4);
        break;
      case normalizedRotation >= 0.85 && normalizedRotation <= 1.3:
        setCurrentStage(3);
        break;
      case normalizedRotation >= 2.4 && normalizedRotation <= 2.6:
        setCurrentStage(2);
        break;
      case normalizedRotation >= 4.25 && normalizedRotation <= 4.75:
        setCurrentStage(1);
        break;
      default:
        setCurrentStage(null);
    }
    }
  })
  


  return (
    <a.group ref={group} {...props} >
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
          <group name="Earth_animationfbx" rotation={[Math.PI / 2, 0, 0]}>
            <group name="Object_2">
              <group name="RootNode">
                
                <group
                  name="Camera"
                  position={[3157.233, 104.211, 2142.973]}
                  rotation={[-Math.PI, 0.822, -3.123]}
                  scale={100}>
                  <group name="Object_5" />
                </group>

                <group  ref={earthRef} name="Earth" rotation={[-Math.PI / 2, 0, -1.544]} scale={99.307}>
                  <mesh
                    name="Earth_Earth_0"
                    geometry={nodes.Earth_Earth_0.geometry}
                    material={materials.Earth}
                  />
                </group>

                <group name="Clouds" rotation={[-Math.PI / 2, 0, 0]} scale={100}>
                  <mesh
                    name="Clouds_Clouds_0"
                    geometry={nodes.Clouds_Clouds_0.geometry}
                    material={materials.Clouds}
                  />
                </group>

                <group
                  name="Sun"
                  position={[-436.269, -41.999, -2270.238]}
                  rotation={[-0.714, 0.683, -0.717]}
                  scale={100}>

                  <group name="Object_11" rotation={[Math.PI / 2, 0, 0]}>
                    <group name="Object_12" />
                  </group>

                </group>
              </group>
            </group>
          </group>
        </group>
      </group>

    </a.group>
  )
}

export default Planet

