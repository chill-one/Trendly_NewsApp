import React from 'react';
import { useState } from 'react';
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import Loader from '../components/Loader';
import HomeInfo from '../components/HomeInfo';

import  Planet  from '../models/Planet';
import  Sky from '../models/Sky';
import AirPlane from '../models/AirPlane';
import Satelite from '../models/Satelite';



const Home = () => {
  const [isRotating, setIsRotating] = useState(false);
  const [currentStage, setCurrentStage] = useState(1);


  //Getting the correct size for the current screen
  const adjustPlanetForScreenSize = () => {
    let screenScale = null;
    let screenPosition = [0, -6.5, -43];
    let rotation = [(23.5 * Math.PI) / 180, 0.4, 0];



    if(window.innerWidth < 768){
      screenScale = [0.02,0.02,0.02];
    } else {
      screenScale = [0.02,0.02,0.02];
    }

    return [screenScale, screenPosition, rotation];
  }

  //Where to place the plane
  const adjustPlaneForScreenSize = () => {
    let screenScale, screenPosition = null;


    if(window.innerWidth < 768){
      screenScale = [.1,.1,.1];
      screenPosition = [0, -1.5, 0];
    } else {
      screenScale = [.2,.2,.2];
      screenPosition = [0, -4, -4];
    }

    return [screenScale, screenPosition];
  }

  const [PlanetScale, PlanetPosition, PlanetRotation] = adjustPlanetForScreenSize();
  const [PlaneScale, PlanePosition] = adjustPlaneForScreenSize();

  return (
    <section className='w-full h-screen relative'>
      <div className='absolute top-28 left-0 right-0 z-10 flex items-center justify-center'>
        {currentStage && <HomeInfo currentStage={currentStage}/>}
      </div>

      <Canvas 
      className={`w-full h-screen bg-transparent ${isRotating ? "cursor-grabbing" : "cursor-grab"}`}
      camera={{near: 0.1, far: 1000}}
      >
        <Suspense fallback={<Loader/>}>
        <directionalLight position={[1,1,1]} intensity={6}/>
        <ambientLight intensity={1}/>
        <hemisphereLight skyColor='#b1e1ff' groundColor='#000000'
        intensity={3}/>

        <Satelite/>
        <Sky
          isRotating={isRotating}
        />
        <Planet
          position={PlanetPosition}
          scale={PlanetScale}
          rotation={PlanetRotation}
          isRotating={isRotating}
          setCurrentStage={setCurrentStage}
          setIsRotating={setIsRotating}
        />
        <AirPlane
          isRotating={isRotating}
          position={PlanePosition}
          scale={PlaneScale}
          rotation={[0, 20, 0]}
        />
        </Suspense>
      </Canvas>
    </section>
      
  )
}

export default Home