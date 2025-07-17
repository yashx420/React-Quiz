import { useEffect, useReducer } from "react";
import DateCounter from "./DateCounter";
import Header from "./Header"
import Main from "./Main"
import { isValidInputTimeValue } from "@testing-library/user-event/dist/utils";
import Loader from "./Loader"
import Error from "./Error"
import StartScreen from "./StartScreen";
import Questions from "./Questions";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Timer from "./Timer";
const SPQ = 30;
const initialState = {
  questions: [],
  status: 'loading', //loading, error, ready, active, finished
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsLeft: null
};

function reducer(state, action){
  switch(action.type){
    case 'dataReceived':
      return {...state, questions: action.payload, status: 'ready'};
    case 'dataFailed':
      return {...state, status: "error"};
    case 'start':
      return {...state, status: "active", secondsLeft: state.questions.length * SPQ}
    case 'newAnswer':
      const question = state.questions.at(state.index);
      return {...state, answer: action.payload, points: action.payload === question.correctOption ? state.points + question.points : state.points}
    case 'nextQuestion':
      return {...state, index: state.index+1, answer: null}
    case 'finish':
      return {...state, status: 'finished', highscore: state.points > state.highscore ? state.points : state.highscore}
    case 'restart':
      return {...state, points: 0, highscore: 0, index: 0, answer: null, status: "ready", secondsLeft: state.questions.length * SPQ};
    case 'tick':
      return {...state, secondsLeft: state.secondsLeft - 1, status: state.secondsLeft === 0 ? "finished" : state.status}
    default:
      throw new Error("Error found")
  }
}

export default function App() {
  const [{ status, questions, index, answer, points, highscore, secondsLeft }, dispatch] = useReducer(reducer, initialState);
  const n = questions.length;
  const maxPoints = questions.reduce((prev, cur) => prev + cur.points, 0);

  useEffect(function () {
  fetch("/questions.json")
    .then(res => res.json())
    .then(data => dispatch({ type: 'dataReceived', payload: data.questions }))
    .catch(err => dispatch({ type: "dataFailed" }));
}, []);


  return (
    <div>
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <StartScreen n={n} dispatch={dispatch} index={index} />}
        {status === "active" && (
          <>
            <Progress n={n} index={index} totalPoints={maxPoints} points={points} answer={answer}/>
            <Questions dispatch={dispatch} question={questions[index]} answer={answer} />
            <footer>
              <NextButton dispatch={dispatch} answer={answer} index={index} n={n}/>
              <Timer secondsLeft={secondsLeft} dispatch={dispatch}/>
            </footer>
            
            <div>
            </div>
          </>
        )}
        {status === "finished" && <FinishScreen points={points} maxPoints={maxPoints} highscore={highscore} dispatch={dispatch}/>}
      </Main>
    </div>
  );
}
