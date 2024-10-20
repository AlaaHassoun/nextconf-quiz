import React, { forwardRef, useContext } from "react";
import Question from "./Question";
import Answer from "../answers/Answer";
import { QuizContext } from "../../context/quizContext";
import { E_DATA, N_DATA, T_DATA, X_DATA } from "../../data/data";

const Questions = forwardRef((_, ref) => {
  const { questions } = useContext(QuizContext);
  const { positions: positionsN, id: idN, question: questionN, questionPosition: questionPositionN } = N_DATA;
  const { positions: positionsE, id: idE, question: questionE, questionPosition: questionPositionE } = E_DATA;
  const { positions: positionsX, id: idX, question: questionX, questionPosition: questionPositionX } = X_DATA;
  const { positions: positionsT, id: idT, question: questionT, questionPosition: questionPositionT } = T_DATA;

  const qaComponents = {
    "n-letter": { 
      question: (index) => <Question key={index} positions={positionsN} id={idN} text={questionN} textPosition={questionPositionN}/>, 
      answer: (index) => <Answer key={index} positions={positionsN} id={idN}/> },
    "e-letter": { 
      question: (index) => <Question key={index} positions={positionsE} id={idE} text={questionE} textPosition={questionPositionE}/>, 
      answer: (index) => <Answer key={index} positions={positionsE} id={idE}/> },
    "x-letter": { 
      question: (index) => <Question key={index} positions={positionsX} id={idX} text={questionX} textPosition={questionPositionX}/>, 
      answer: (index) => <Answer key={index} positions={positionsX} id={idX}/> },
    "t-letter": { 
      question: (index) => <Question key={index} positions={positionsT} id={idT} text={questionT} textPosition={questionPositionT}/>, 
      answer: (index) => <Answer key={index} positions={positionsT} id={idT}/> 
    }
  };

  return (
    <group ref={ref}>
      {questions.map(({ id, isIntersected }, index) => {
        const components = qaComponents[id];
        return components ? (isIntersected ? components.answer(index): components.question(index)) : null;
      })}
    </group>
  )
});

export default Questions;