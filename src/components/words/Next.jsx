import React, { useContext } from "react";
import Answer from "../answers/Answer";
import { QuizContext } from "../../context/quizContext";
import { E_DATA, N_DATA, T_DATA, X_DATA } from "../../data/data";

const Next = ({position, rotation}) => {
  const { questions } = useContext(QuizContext);
  const { positions: positionsN, id: idN } = N_DATA;
  const { positions: positionsE, id: idE } = E_DATA;
  const { positions: positionsX, id: idX } = X_DATA;
  const { positions: positionsT, id: idT } = T_DATA;

  const qaComponents = {
    "n-letter": (index) => <Answer key={index} positions={positionsN} id={idN}/>,
    "e-letter": (index) => <Answer key={index} positions={positionsE} id={idE}/>,
    "x-letter": (index) => <Answer key={index} positions={positionsX} id={idX}/>,
    "t-letter": (index) => <Answer key={index} positions={positionsT} id={idT}/>
  };

  return (
    <group
      position={position}
      rotation={rotation}
    >
      {questions.map(({ id }, index) => {
        const components = qaComponents[id];
        return components ? components(index) : null;
      })}
    </group>
  )
}

export default Next;