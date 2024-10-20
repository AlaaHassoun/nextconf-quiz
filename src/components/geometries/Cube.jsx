import React, { useRef } from "react"
import { Text } from "@react-three/drei";
import { suspend } from "suspend-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Geist = import("../../fonts/Geist-Medium.ttf");

gsap.registerPlugin(useGSAP);

const Cube = ({
  id,
  position,
  name,
  movedCube,
  args = [0.95, 0.5, 0.95],
  color = "#5f5f5f",
  isIntersected,
  text
}) => {
  const meshRef = useRef();  
  
  useGSAP(
    () => {
      if(meshRef.current) {
        gsap.from(meshRef.current.scale, { 
          x: 0, 
          y: 0, 
          z: 0, 
          duration: 1.5, 
          ease: "power2.out" 
        });
      }
    }
  );

  if(isIntersected) {
    return null
  }

  return (
    <mesh
      ref={meshRef} 
      castShadow={true}
      position={position}
      userData={{
        id:id,
        name: name,
        movedCube: movedCube,
      }}
    >
      <boxGeometry args={args} wireframe={true}/>
      <meshPhysicalMaterial
        color={color}
        transparent={true}     
        opacity={0.9}          
        roughness={10}       
        metalness={6}          
        reflectivity={0.5}       
        transmission={0.9}       
        thickness={10}          
        clearcoat={10}          
        clearcoatRoughness={6.3} 
        ior={1.4}             
      />
      {text && (
        <Text
          position={[-0.35, 0.5, 0.3]}
          rotation={[-Math.PI / 2, 0, 0]}
          fontSize={0.15} 
          color="#fff" 
          anchorX="left" 
          anchorY="bottom" 
          font={suspend(Geist).default}
        >
          {text}
        </Text>
      )}
    </mesh>
  )
}

export default Cube;