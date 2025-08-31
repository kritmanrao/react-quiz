function NextButton({ dispatch, question, index, numQuestion }) {
  if (!question) return;

  if (index < numQuestion - 1) {
    return (
      <button
        className="btn btn-ui"
        onClick={() => {
          dispatch({ type: "nextQuestion" });
        }}
      >
        next
      </button>
    );
  }

  if (index == numQuestion - 1) {
    return (
      <button
        className="btn btn-ui"
        onClick={() => {
          dispatch({ type: "finish" });
        }}
      >
        Finish
      </button>
    );
  }
}

export default NextButton;
