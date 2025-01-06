import { useGLTF } from '@react-three/drei'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

import React from 'react'
import skySceen from '../assets/3d/sky.glb'


export const Sky = ({ isRotating }) => {
  const sky = useGLTF(skySceen)
  const skyRef = useRef()

  useFrame((_,delta) => {
    if(isRotating && skyRef.current){
      skyRef.current.rotation.y += 0.15 * delta
    }
  })

  return (
    <mesh ref={skyRef}>
        <primitive 
            object={sky.scene}
            postion={[0, -6.5 , -43]} 
            scale = {[90,90, 90]}
         />
    </mesh>
  )
}


export default Sky