import React, { useEffect, useState } from "react";
import QuizData from "../data";
import Result from "./Result";
import Question from "./Question";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Quiz = () => {
  const [currQuestionIndex, setCurrQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(20);
  const [time, setTime] = useState(0);

  useEffect(() => {
    if (timeLeft === 0) {
      if (!showResult) {
        answerClickOption(null);
      }
      return;
    } else {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  useEffect(() => {
    if (showResult) return;
    const totalTime = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);
    return () => clearTimeout(totalTime);
  }, [showResult]);

  const answerClickOption = (select) => {
    if (select === QuizData[currQuestionIndex].answer) {
      setScore(score + 1);
      toast.success("Correct answer!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (timeLeft === 0 && !showResult) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Time over!",
      });
    } else if (!showResult) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Wrong answer!",
      });
    }

    const nextQuestion = currQuestionIndex + 1;
    if (nextQuestion <= QuizData.length) {
      setCurrQuestionIndex(nextQuestion);
      setTimeLeft(20);
    } else {
      setShowResult(true);
    }
  };

  return (
    <div>
      <ToastContainer />
      {showResult ? (
        <Result score={score} allQuestion={QuizData.length} time={time} />
      ) : (
        <div>
          <h4 className="timer">Time Left: {timeLeft} seconds</h4>
          <Question
            question={QuizData[currQuestionIndex]}
            answerClickOption={answerClickOption}
            time={time}
            allQuestion={QuizData.length}
            score={score}
            questionIndex={currQuestionIndex}
          />
        </div>
      )}
    </div>
  );
};

export default Quiz;
