import React, { useEffect } from 'react'
import { useRef } from 'react'
import plane from '../assets/3d/airplane.glb'
import { useAnimations, useGLTF } from '@react-three/drei'

export const AirPlane = ( {isRotating, ...props }) => {
  const ref = useRef();
  const {scene, animations } = useGLTF(plane)
  const { actions } = useAnimations(animations, ref);

  useEffect(() => {
    if(isRotating){
      actions['Take 001'].play()
    }else{
      actions['Take 001'].stop()
    }
  },[actions, isRotating])

  return (
    <mesh {...props} ref={ref}>
        <primitive 
            object={scene}
         />
    </mesh>
  )
}

export default AirPlane