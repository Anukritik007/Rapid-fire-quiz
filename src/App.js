import "./App.css";
import { useState, useEffect } from "react";
import { quizSets } from "./data";
import Button from "./components/Button/Button";
import Timer from "./components/Timer/Timer";

const ansTimer = 2;
let interval; // TODO: useRef

function App() {
  const [quizStarted, setQuizStarted] = useState(false);
  const [isEndOfSet, setIsEndOfSet] = useState(false);
  const [selectedSetIndex, setSelectedSetIndex] = useState(0);
  const [currentQues, setCurrentQues] = useState({});
  const [questionIdx, setQuestionIdx] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [time, setTime] = useState();

  // Switch to next questions
  useEffect(() => {
    if (quizStarted) {
      const questions = quizSets[selectedSetIndex]?.questions;

      if (!questions[questionIdx]) {
        setIsEndOfSet(true);
        clearInterval(interval);
        return;
      }

      setCurrentQues(questions[questionIdx]);
      setShowAnswer(false);
      setTime(questions[questionIdx]?.time || 0);
    }
  }, [questionIdx, selectedSetIndex, quizStarted]);

  // trigger switch to next question
  useEffect(() => {
    if (time === 0) {
      setShowAnswer(true);
    } else if (time === -ansTimer) {
      setQuestionIdx((qIdx) => qIdx + 1);
    }
  }, [time]);

  const restartTimer = () => {
    clearInterval(interval);

    interval = setInterval(() => {
      setTime((t) => t - 1);
    }, 1000);
  };

  const handleStart = () => {
    setQuestionIdx(0);
    setQuizStarted(true);
    setIsEndOfSet(false);
    restartTimer();
  };

  const handleSelectSet = (index) => {
    setSelectedSetIndex(index);
    setQuizStarted(false);
    setIsEndOfSet(false);
    clearInterval(interval);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <p>Rapid Fire</p>
          <p>Fun Friday</p>
        </div>
      </header>
      <div className="main">
        <section className="left-section">
          {quizSets &&
            quizSets.map((set, index) => (
              <Button
                key={set.setName}
                name={set.setName}
                isActive={index === selectedSetIndex}
                handleClick={() => handleSelectSet(index)}
              />
            ))}
        </section>
        <section className="mid-section">
          <div className="ques">
            {isEndOfSet ? (
              <p>Well Done!</p>
            ) : quizStarted ? (
              <>
                <p>
                  {questionIdx + 1 + ") "}
                  {currentQues && currentQues.ques}
                </p>
                <p>{showAnswer && currentQues.answer}</p>
              </>
            ) : (
              <p>Let's Begin!</p>
            )}
          </div>
          <div className="controls">
            <Button name="Start" handleClick={handleStart} />
            <Button
              name="Previous"
              handleClick={() => {
                setQuestionIdx((qIdx) => qIdx - 1);
                setIsEndOfSet(false);
                restartTimer();
              }}
              isDisabled={questionIdx === 0}
            />
            <Button
              name="Next"
              handleClick={() => {
                setQuestionIdx((qIdx) => qIdx + 1);
                restartTimer();
              }}
              isDisabled={isEndOfSet}
            />
          </div>
        </section>
        <section className="right-section">
          <div className="timer-container">
            {quizStarted && time >= 0 && <Timer remainingTime={time} />}
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
