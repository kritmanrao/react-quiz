function FinishScreen({ points, maxPoint, highScore, dispatch }) {
  const percentage = (points / maxPoint) * 100;

  let emoji;
  if (percentage === 100) emoji = "🥇";
  if (percentage >= 80 && percentage < 100) emoji = "🎉";
  if (percentage >= 50 && percentage < 80) emoji = "🙃";
  if (percentage >= 0 && percentage < 50) emoji = "🤨";
  if (percentage === 0) emoji = "🤦‍♂️";

  return (
    <>
      <p className="result">
        <span>{emoji}</span>You scored <strong> {points} </strong> out of{" "}
        {maxPoint}({Math.ceil(percentage)}) %.
      </p>

      <p className="highscore">High score : {highScore}</p>

      <button
        className="btn btn-ui"
        onClick={() => {
          dispatch({ type: "restart" });
        }}
      >
        Restart Quiz
      </button>
      <a
        href="https://www.linkedin.com/in/kritmanrao"
        className="dev-text"
        target="_blank"
        rel="noopener noreferrer"
      >
        Dev: kritman rao
      </a>
    </>
  );
}

export default FinishScreen;
