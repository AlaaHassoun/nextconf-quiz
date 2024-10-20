import React, { useRef } from "react";
import { Text } from "@react-three/drei";
import Plane from "../geometries/Plane";
import { suspend } from "suspend-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Geist = import("../../fonts/Geist-Medium.ttf");

const Question = ({ id, positions, text, textPosition }) => {
  const textRef = useRef(null);

  useGSAP(
    () => {
      if(textRef.current) {
        gsap.from(textRef.current, { 
          fillOpacity: 0, 
          duration: 5, 
          ease: "power2.out"
        });
      }
    }
  );

  return (
    <group>
      {text && (
        <Text
          ref={textRef}
          position={textPosition}
          rotation={[-Math.PI / 2, 0, 0]}
          fontSize={0.25}
          color="#fff"
          anchorX="left"
          anchorY="bottom"
          font={suspend(Geist).default}
        >
          {text.toUpperCase()}
        </Text>
      )}
      {positions.map(({position}, index) => (
        <Plane
          key={index} 
          id={id}
          position={position}
          isIntersected={true}
          args={[1, 1]}
          color="#0c0c0c"
          index={index}
        />
      ))}
    </group>
  )
}

export default Question;