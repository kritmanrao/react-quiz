import { useState } from "react";

function Questions({ question, dispatch, answer }) {
  return (
    <div>
      <h3> {question.question} </h3>
      <Options
        options={question.options}
        dispatch={dispatch}
        answer={answer}
        correctOption={question.correctOption}
      />
    </div>
  );
}

function Options({ options, dispatch, answer, correctOption }) {
  const isAnswered = answer !== null;

  return (
    <div className="options">
      {options.map((option, i) => (
        <button
          className={`btn btn-option ${answer === i ? "answer" : ""} ${
            isAnswered ? (i === correctOption ? "correct" : "wrong") : ""
          } `} 
          disabled={isAnswered}
          key={option}
          onClick={() => {
            dispatch({ type: "newAnswer", payload: i });
          }}
        >
          {" "}
          {option}{" "}
        </button>
      ))}
    </div>
  );
}

export default Questions;
