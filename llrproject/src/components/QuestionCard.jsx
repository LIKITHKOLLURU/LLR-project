import { useEffect, useState } from 'react';
import questionsData from '../data/questions.json';

const MockTest = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [showResult, setShowResult] = useState(false);

  // Shuffle and pick 20 questions
  useEffect(() => {
    const shuffled = [...questionsData].sort(() => 0.5 - Math.random());
    setQuestions(shuffled.slice(0, 20));
  }, []);

  // Countdown timer
  useEffect(() => {
    if (showResult) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev === 1) {
          handleNext(); // Auto-next
          return 30;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQIndex, showResult]);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    if (option === questions[currentQIndex].answer) {
      setScore(prev => prev + 1);
    }
    setTimeout(handleNext, 500); // brief delay
  };

  const handleNext = () => {
    setSelectedOption(null);
    if (currentQIndex + 1 < questions.length) {
      setCurrentQIndex(prev => prev + 1);
      setTimeLeft(30);
    } else {
      setShowResult(true);
    }
  };

  if (questions.length === 0) return <p>Loading questions...</p>;

  if (showResult) {
    return (
      <div className="result-container">
        <h2>Mock Test Result</h2>
        <p>Your Score: {score} / 20</p>
        <p>{score >= 12 ? '✅ Passed!' : '❌ Failed. Try Again!'}</p>
      </div>
    );
  }

  const question = questions[currentQIndex];

  return (
    <div className="mocktest-container">
      <h2>Mock Test</h2>
      <div className="question-card">
        <div className="timer">⏳ Time Left: {timeLeft}s</div>
        <h3>Q{currentQIndex + 1}: {question.question}</h3>
        <div className="options">
          {question.options.map((option, index) => (
            <button
              key={index}
              className={`option-btn ${selectedOption === option ? 'selected' : ''}`}
              disabled={!!selectedOption}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MockTest;
