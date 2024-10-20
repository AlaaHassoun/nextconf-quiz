import React, { useContext, useEffect, useRef } from "react";
import { Html, Plane } from "@react-three/drei";
import Next from "../../components/words/Next";
import Background from "../../components/geometries/Plane";
import { navigate } from "wouter/use-browser-location";
import gsap from "gsap";
import { QuizContext } from "../../context/quizContext";


const Page = ({ text, planePosition, path }) => {
  const { total } = useContext(QuizContext);
  const foregroundRef = useRef();
  const buttonRef = useRef();

  const onClickHandler = () => {
    if(foregroundRef.current) {
      gsap.to(foregroundRef.current.position, {
        x: 0,  
        duration: 4.5,                
        ease: "power2.out",         
        onComplete: () => {
          navigate("/quiz");
        }
      });
      gsap.to(buttonRef.current, {
        alpha: 0,  
        duration: 4.5,                
        ease: "power2.out"         
      });
    }
  }

  return (
    <group
      rotation={[-Math.PI / 2 / 1.5, 0, 0]}
    >
      <Background
        rotation={[0, 0, 0]}
        name="Background"
        isFloor={true}
        args={[100, 100]}
        color="#0c0c0c"
        receiveShadow={true}
        castShadow={true}
      />

      <Plane
        ref={foregroundRef}
        args={[100, 100]}
        position={[planePosition, 0, 1]}
        rotation={[0, 0, 0]}
        receiveShadow={true}
        castShadow={true}
      >
        <meshBasicMaterial attach="material" color="#0c0c0c"/>
      </Plane>
      <Next
        rotation={[Math.PI / 2, 0, 0]}
      />
      <Html 
        ref={buttonRef}
        wrapperClass="button-wrapper"
      >
        <button 
          onClick={onClickHandler}
          className="button-link" 
        >
          {text}
        </button>
      </Html>
    </group>
  )
}

export default Page;