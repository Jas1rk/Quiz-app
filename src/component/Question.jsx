import React, { useState } from "react";

const Qustion = ({
  question,
  answerClickOption,
  time,
  allQuestion,
  score,
  questionIndex,
}) => {
  return (
    <div className="container">
      <h4>
        Question : {questionIndex + 1} / {allQuestion}{" "}
      </h4>
      <h4>Time : {time}</h4>
      <h4>Score: {score}</h4>

      <h2 className="quesion-session">{question.question}</h2>
      <div>
        {question.options.map((data, index) => (
          <button key={index} onClick={() => answerClickOption(data)}>
            {data}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Qustion;
