import { useEffect, useState } from 'react';
import questionsData from '../data/questions.json';

const MockTest = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [showResult, setShowResult] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(true); // NEW

  useEffect(() => {
    const shuffled = [...questionsData].sort(() => 0.5 - Math.random());
    setQuestions(shuffled.slice(0, 20));
  }, []);

  useEffect(() => {
    if (showResult || showConfirmation) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev === 1) {
          handleNext();
          return 30;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQIndex, showResult, showConfirmation]);

  const handleOptionClick = (optionIndex) => {
    setSelectedOption(optionIndex);
    const correctIndex = questions[currentQIndex].correctAnswer;

    if (optionIndex === correctIndex) {
      setScore(prev => prev + 1);
    }

    setUserAnswers(prev => [...prev, optionIndex]);
    setTimeout(handleNext, 500);
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

  const startTest = () => {
    setShowConfirmation(false);
  };

  if (questions.length === 0) return <p>Loading questions...</p>;

  if (showConfirmation) {
    return (
      <div className="confirmation-container">
        <h2>📋 Mock Test Prerequisites</h2>
        <ul>
          <li>📌 20 questions will be shown.</li>
          <li>⏱️ Each question has a 30-second timer.</li>
          <li>✅ You must score at least 12 to pass.</li>
          <li>🚫 No going back to previous questions.</li>
        </ul>
        <button className="start-btn" onClick={startTest}>Start Test</button>
      </div>
    );
  }

  if (showResult) {
    return (
      <div className="result-container">
        <h2>Mock Test Result📝</h2>
        <p className="score-text"><li>Your Score: {score} / {questions.length}</li></p>
        <p className={`result-text ${score >= 12 ? 'result-pass' : 'result-fail'}`}>
          {score >= 12 ? '✅ Passed!' : '❌ Failed. Try Again!'}
        </p>

        <div className="review-section">
          <h3>Review Your Answers</h3>
          {questions.map((q, idx) => {
            const userAnswerIndex = userAnswers[idx];
            const isCorrect = userAnswerIndex === q.correctAnswer;
            return (
              <div key={idx} className="review-question">
                <p><strong>Q{idx + 1}:</strong> {q.question}</p>
                <p>
                  Your Answer:{' '}
                  <span style={{ color: isCorrect ? 'green' : 'red' }}>
                    {q.options[userAnswerIndex] || 'Not Answered'} {isCorrect ? '✔' : '❌'}
                  </span>
                </p>
                {!isCorrect && (
                  <p>
                    Correct Answer:{' '}
                    <span style={{ color: 'green' }}>
                      {q.options[q.correctAnswer]} ✔
                    </span>
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  const question = questions[currentQIndex];

  return (
    <div className="mocktest-container">
      <h2>Mock Test</h2>
      <div className="question-card">
        <div className="timer">⏳ Time Left: {timeLeft}s</div>
        <h3 className="question-text">Q{currentQIndex + 1}: {question.question}</h3>
        <div className="options">
          {question.options.map((option, index) => (
            <button
              key={index}
              className={`option-btn ${selectedOption === index ? 'selected' : ''}`}
              disabled={selectedOption !== null}
              onClick={() => handleOptionClick(index)}
            >
              <span className="option-circle"></span>
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MockTest;
