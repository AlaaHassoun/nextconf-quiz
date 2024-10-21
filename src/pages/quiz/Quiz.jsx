import React, { useCallback, useContext, useEffect, useRef } from "react";
import { Grid } from "@react-three/drei";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import Background from "../../components/geometries/Plane";
import Questions from "../../components/questions/Questions";
import Answers from "../../components/answers/Answers";
import { QuizContext } from "../../context/quizContext";
import gsap from "gsap";
import { navigate } from "wouter/use-browser-location";

const raycaster = new THREE.Raycaster(); 
const mouseClickPosition = new THREE.Vector2(); 
const mouseMovePosition = new THREE.Vector2(); 

const Quiz = () => {
  const { onIntersectHandler, total, onReset } = useContext(QuizContext);
  const { camera, scene, gl } = useThree();
  let movedCube = useRef(null);
  let intersectedQuestion = useRef(null);
  const questionsRef = useRef(null);
  const gridRef = useRef(null);

  const intersectedObjects = useCallback((position) => {
    raycaster.setFromCamera(position, camera);
    return raycaster.intersectObjects(scene.children);
  },[camera, scene])

  const mouseClickHandler = useCallback((event) => {
    if (movedCube.current != null) {
      const intersectedQuestionId = intersectedQuestion?.current?.object?.userData?.id;
      const movedCubeId = movedCube?.current?.userData?.id;

      onIntersectHandler(
        intersectedQuestionId, 
        movedCubeId,
        movedCube.current
      );
      movedCube.current = null;
      intersectedQuestion.current = null;
      gl.domElement.style.cursor = "default";
      return;
    }
    

    mouseClickPosition.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouseClickPosition.y = -(event.clientY / window.innerHeight) * 2 + 1;
  
    const intersects = intersectedObjects(mouseClickPosition);
    if (intersects.length > 0) {
      if (intersects[0].object.userData.movedCube) {
        gl.domElement.style.cursor = "grabbing";
        movedCube.current = intersects[0].object;
      }
    }
  },[intersectedObjects, onIntersectHandler, gl])

  const mouseMoveHandler = useCallback((event) => {
    mouseMovePosition.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouseMovePosition.y = -(event.clientY / window.innerHeight) * 2 + 1;
  },[])

  const moveCube = () => {
    if (movedCube.current != null) {
      const intersects = intersectedObjects(mouseMovePosition);
      if (intersects.length > 0) {
        for (let i = 0; i < intersects.length; i++) {
          if (intersects[i].object.userData.isFloor) {
            let target = intersects[i].point;
            movedCube.current.position.x = target.x
            movedCube.current.position.z = target.z
            intersectedQuestion.current = null;
          } 
        }
      }
    }
  }

  const snapToBox = () => {
    if(movedCube.current != null) {
      const intersects = intersectedObjects(mouseMovePosition);
      if(intersects.length > 0) {
        for(let i = 0; i < intersects.length; i++) {
          if(intersects[i].object.userData.isIntersected) {
            let target = intersects[i];
            movedCube.current.position.x = target.object.position.x;
            movedCube.current.position.z = target.object.position.z;
            intersectedQuestion.current = target;
          } 
        }
      }
    }
  }

  useEffect(() => {
    window.addEventListener("click", mouseClickHandler);
    window.addEventListener("mousemove", mouseMoveHandler);

    return () => {
      window.removeEventListener("click", mouseClickHandler);
      window.removeEventListener("mousemove", mouseMoveHandler);
    }
  },[mouseClickHandler, mouseMoveHandler])

  useFrame(() => {
    moveCube();
    snapToBox();
  })

  useEffect(() => {
    if(total === 4) {
      if(questionsRef.current) {
        const tl = gsap.timeline();

        tl.to(questionsRef.current.position, { 
          y: 2, 
          duration: 0.6, 
          ease: "power2.inOut"
        });
        
        tl.to(questionsRef.current.rotation, { 
          x: Math.PI * 0.25,
          y: -Math.sin(0.1),
          z: 0, 
          duration: 0.7, 
          ease: "power2.inOut"
        });

        tl.to(questionsRef.current.rotation, { 
          x: Math.PI * 0.25,
          y: Math.sin(0.1),
          z: 0, 
          duration: 0.8, 
          ease: "power2.inOut"
        });

        tl.to(questionsRef.current.rotation, { 
          x: Math.PI * 0.25,
          y: 0,
          z: 0, 
          duration: 0.9, 
          ease: "power2.inOut"
        });
        
        tl.to(questionsRef.current.position, { 
          x: 100, 
          duration: 1, 
          ease: "power2.inOut",
          onComplete: () => {
            onReset();
            navigate("/winner");
          }
        });
      }
    }
  },[total, onReset]);

  return (
    <group>
      <Background
        rotation={[-Math.PI / 2, 0, 0]}
        name="Floor"
        isFloor={true}
        args={[100,100]}
        color="#0c0c0c"
        receiveShadow={true}
        castShadow={true}
      />      
      <Questions ref={questionsRef}/>
      <Answers/>
      <Grid
        ref={gridRef}
        position={[0,0,0]}
        gridSize={[100, 100]}
        cellSize={0.8}
        cellThickness={0.8}
        cellColor={"#1e1e1e"}
        sectionSize={0}
        fadeDistance={25}
        fadeStrength={1}
        followCamera={false}
        infiniteGrid={true}
      />
    </group>
  )
}

export default Quiz;