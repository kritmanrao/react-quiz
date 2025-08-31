import { useEffect, useReducer } from "react";
import {
  Header,
  Error,
  StartScreen,
  Main,
  Loader,
  Questions,
  NextButton,
  Progress,
  FinishScreen,
  Footer,
  Timer,
} from "./components";
import questionsData from "./data/questions.json";
 
const SECS_PER_QUESTION = 30;

const initialState = {
  questions: [],
  // loading, error, ready, active, finished
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
  timeleft: null,
};

function reducer(state, action) {
  let question = "";
  switch (action.type) {
    case "dataReceved":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "dataField":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
        timeleft: state.questions.length * SECS_PER_QUESTION,
      };
    case "newAnswer":
      question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return { ...state, answer: null, index: state.index + 1 };
    case "finish":
      return {
        ...state,
        status: "finish",
        highScore: Math.max(state.highScore, state.points),
      };
    case "restart":
      return {
        ...initialState,
        status: "ready",
        highScore: state.highScore,
        questions: state.questions,
      };
    case "tick":
      return {
        ...state,
        timeleft: state.timeleft - 1,
        status: state.timeleft === 0 ? "finish" : state.status,
      };
    default:
      throw new Error("Unknown Action");
  }
}

function App() {
  const [
    { questions, status, index, answer, points, highScore, timeleft },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numQuestions = questions.length;
  const totalPoints = questions.reduce(
    (curr_points, question) => curr_points + question.points,
    0
  );

  useEffect(function () {
    async function fechQuestion() {
      try {
        setTimeout(function(){
          dispatch({ type: "dataReceved", payload: questionsData.questions });
        },500);
      } catch (e) {
        dispatch({ type: "dataField" });
        console.log(e);
      }
    }

    fechQuestion();
  }, []);

  return (
    <div className="app">
      <Header />

      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numQuestions={numQuestions}
              points={points}
              totalPoints={totalPoints}
              answer={answer}
            />

            <Questions
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <Timer dispatch={dispatch} timer={timeleft} />
              <NextButton
                dispatch={dispatch}
                question={questions[index]}
                index={index}
                numQuestion={numQuestions}
              />
            </Footer>
          </>
        )}
        {status === "finish" && (
          <FinishScreen
            points={points}
            maxPoint={totalPoints}
            highScore={highScore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
