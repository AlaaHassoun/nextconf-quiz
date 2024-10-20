import React from "react";
import { Route, Switch } from "wouter";
import Home from "./pages/home/Home";
import Quiz from "./pages/quiz/Quiz";
import Winner from "./pages/winner/Winner";
import CanvasWrapper from "./components/canvas/CanvasWrapper";
import QuizContextProvider from "./context/quizContext";
import NotFound from "./pages/notFound/NotFound";

const App = () => {
  return (
    <QuizContextProvider>
      <CanvasWrapper>
        <Switch>
          <Route path="/">
            <Home />
          </Route>
          <Route path="/quiz">
            <Quiz/>
          </Route>
          <Route path="/winner">
            <Winner />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </CanvasWrapper>
    </QuizContextProvider>
  );
}

export default App;
