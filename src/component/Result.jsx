import React from "react";


const Result = ({ score, allQuestion, time }) => {
  
  return (
    <div>
      <h2>
        Your score is : {score} / {allQuestion}
      </h2>
      <p>Thank you for taking this quiz!!!</p>
      <h3>You have spent {time} minutes to complete </h3>
     
    </div>
  );
};

export default Result;
