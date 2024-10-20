import React, { useContext } from "react";
import Cube from "../geometries/Cube";
import { QuizContext } from "../../context/quizContext";
import { E_DATA, N_DATA, T_DATA, X_DATA } from "../../data/data";

const Answers = () => {
  const { questions } = useContext(QuizContext);
  const { id: idN, answer: answerN } = N_DATA;
  const { id: idE, answer: answerE } = E_DATA;
  const { id: idX, answer: answerX } = X_DATA;
  const { id: idT, answer: answerT } = T_DATA;

  const answerComponents = {
    "n-letter": (isIntersected, index) => <Cube key={index} id={idN} position={[Math.PI / 2 * index - 2, 0.25, 4]} isIntersected={isIntersected} movedCube={true} text={answerN} />,
    "e-letter": (isIntersected, index) => <Cube key={index} id={idE} position={[Math.PI / 2 * index - 2, 0.25, 4]} isIntersected={isIntersected} movedCube={true} text={answerE} />,
    "x-letter": (isIntersected, index) => <Cube key={index} id={idX} position={[Math.PI / 2 * index - 2, 0.25, 4]} isIntersected={isIntersected} movedCube={true} text={answerX} />,
    "t-letter": (isIntersected, index) => <Cube key={index} id={idT} position={[Math.PI / 2 * index - 2, 0.25, 4]} isIntersected={isIntersected} movedCube={true} text={answerT} />
  };

  return (
    <group>
      {questions.map(({ id, isIntersected }, index) => {
        const component = answerComponents[id];
        return component ? component(isIntersected, index) : null;
      })}
    </group>
  )
}

export default Answers;