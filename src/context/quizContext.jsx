import { createContext, useState } from "react";

export const QuizContext = createContext({
  questions:[],
  total: 0,
  onIntersectHandler: () => {},
  onReset: () => {}
});


export const QUESTIONS_DATA = [
  {
    id: "e-letter",
    name: "E",
    isIntersected: false,
    intersectedObjects:[]
  },
  {
    id: "n-letter",
    name: "N",
    isIntersected: false,
    intersectedObjects:[]
  },
  {
    id: "t-letter",
    name: "T",
    isIntersected: false,
    intersectedObjects:[]
  },
  {
    id: "x-letter",
    name: "X",
    isIntersected: false,
    intersectedObjects:[]
  }
];

const QuizContextProvider = ({children}) => {
  const [questions, setQuestions] = useState(QUESTIONS_DATA);
  const [total, setTotal] = useState(0);

  const onIntersectHandler = (questionId, answerId, answerObject) => {

    setQuestions((prevState) => {
      const updatedQuestions = prevState.map((q) => {
        const filterAnswerObject = q.intersectedObjects.filter((object) => object?.userData?.id !== answerId)
        if (q.id === questionId) {
          return { 
            ...q, 
            isIntersected: questionId === answerId ? true : false,
            intersectedObjects: questionId === answerId ?  [...filterAnswerObject] : [...filterAnswerObject, answerObject]
          };
        }
        return {...q, intersectedObjects: filterAnswerObject};
      });
      return updatedQuestions;
    });

    if(questionId === answerId) {
      setTotal((total) => total + 1);
    }
  };

  const onReset = () => {
    setQuestions(QUESTIONS_DATA);
    setTotal(0);
  };

  const value = {
    questions,
    total,
    onIntersectHandler,
    onReset
  };
  
  return(
    <QuizContext.Provider value={value}>
      {children}
    </QuizContext.Provider>
  )
}

export default QuizContextProvider;