import React, { useContext, useEffect } from "react";
import Cube from "../geometries/Cube";
import { QuizContext } from "../../context/quizContext";
import gsap from "gsap";

const Answer = ({ positions, id }) => {
  const { questions } = useContext(QuizContext);

  useEffect(() => {
    const intersectedObjects = questions.find((question) => question.id === id).intersectedObjects;
    if(intersectedObjects) {
      intersectedObjects.forEach((object, index) => {
        gsap.to(object.position, {
          x: -2.5 - ( -index * 2),  
          y: 0.25,
          z: 4,  
          duration: 0.3,                
          ease: "power2.out"         
        });
      })
    }
  },[questions, id])

  return (
    <group>
      {positions.map(({position}) => (
        <Cube position={position}/>
      ))}
    </group>
  )
}

export default Answer;