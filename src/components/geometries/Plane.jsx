import React, { useRef, useState } from "react"
import { Edges, useCursor } from "@react-three/drei";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Plane = ({
  id,
  position,
  rotation = [-Math.PI / 2, 0, 0], 
  name, 
  draggable, 
  isFloor,
  isIntersected,
  args,
  color,
  wireframe,
  opacity,
  transparent,
  receiveShadow,
  castShadow
}) => {
  const planeRef = useRef();
  const [active, setActive] = useState(false);
  useCursor(active);
  
  useGSAP(
    () => {
      if(planeRef.current) {
        gsap.from(planeRef.current.scale, { 
          x: 0, 
          y: 0, 
          z: 0, 
          duration: 1.5, 
          ease: "power2.out" 
        });
      }
    }
  );

  return (
    <mesh 
      receiveShadow={receiveShadow}
      castShadow={castShadow}
      ref={planeRef}
      position={position}
      rotation={rotation}
      userData={{
        id:id,
        name: name,
        draggable: draggable,
        isFloor: isFloor,
        isIntersected: isIntersected
      }}
      onPointerOver={!isFloor ? () => setActive(true) : null}
      onPointerLeave={!isFloor ? () => setActive(false) : null}
    >
      <planeGeometry args={args} />
      <meshBasicMaterial 
        color={active && !isFloor ? "#212121" : color} 
        wireframe={wireframe} 
        opacity={opacity} 
        transparent={transparent}
      />

      <Edges
        lineWidth={2.5}
        geometry={planeRef.current?.geometry}
        color="#303030"
      />
    </mesh>
  )
}

export default Plane;